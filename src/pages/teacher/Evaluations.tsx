import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import DashboardLayout from '@/components/DashboardLayout'
import { CheckCircle, AlertCircle, Send } from 'lucide-react'
import { toast } from 'sonner'

interface StudentEvaluation {
  id: number
  studentName: string
  studentId: string
  courseCode: string
  courseName: string
  midterm?: number
  finals?: number
  status: 'pending' | 'submitted'
  feedback?: string
}

const mockEvaluations: StudentEvaluation[] = [
  { id: 1, studentName: 'Juan Dela Cruz', studentId: 'STU-001', courseCode: 'CS101', courseName: 'Intro to Programming', midterm: 85, finals: 90, status: 'submitted', feedback: 'Excellent work. Shows good understanding of concepts.' },
  { id: 2, studentName: 'Maria Santos', studentId: 'STU-002', courseCode: 'CS101', courseName: 'Intro to Programming', midterm: 78, status: 'pending' },
  { id: 3, studentName: 'Pedro Reyes', studentId: 'STU-003', courseCode: 'CS201', courseName: 'Data Structures', status: 'pending' },
  { id: 4, studentName: 'Ana Cruz', studentId: 'STU-004', courseCode: 'CS101', courseName: 'Intro to Programming', midterm: 92, finals: 88, status: 'submitted' },
]

export default function EvaluationsPage() {
  const [evaluations, setEvaluations] = useState<StudentEvaluation[]>(mockEvaluations)
  const [selectedEval, setSelectedEval] = useState<StudentEvaluation | null>(null)
  const [midtermScore, setMidtermScore] = useState('')
  const [finalsScore, setFinalsScore] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)

  const handleOpenDialog = (evaluation: StudentEvaluation) => {
    setSelectedEval(evaluation)
    setMidtermScore(evaluation.midterm?.toString() || '')
    setFinalsScore(evaluation.finals?.toString() || '')
    setFeedback(evaluation.feedback || '')
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setSelectedEval(null)
    setMidtermScore('')
    setFinalsScore('')
    setFeedback('')
  }

  const handleSubmitEvaluation = async () => {
    if (!selectedEval) return
    
    if (!midtermScore && !finalsScore) {
      toast.error('Please enter at least one grade')
      return
    }

    if (midtermScore && (isNaN(parseFloat(midtermScore)) || parseFloat(midtermScore) < 0 || parseFloat(midtermScore) > 100)) {
      toast.error('Midterm score must be between 0 and 100')
      return
    }

    if (finalsScore && (isNaN(parseFloat(finalsScore)) || parseFloat(finalsScore) < 0 || parseFloat(finalsScore) > 100)) {
      toast.error('Finals score must be between 0 and 100')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/submit-evaluation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('cmdi_token')}`,
        },
        body: JSON.stringify({
          evaluationId: selectedEval.id,
          studentId: selectedEval.studentId,
          courseCode: selectedEval.courseCode,
          midterm: midtermScore ? parseFloat(midtermScore) : null,
          finals: finalsScore ? parseFloat(finalsScore) : null,
          feedback: feedback || null,
        }),
      })

      if (response.ok) {
        toast.success('Evaluation submitted successfully!')
        setEvaluations(prev =>
          prev.map(e =>
            e.id === selectedEval.id
              ? {
                ...e,
                midterm: midtermScore ? parseFloat(midtermScore) : e.midterm,
                finals: finalsScore ? parseFloat(finalsScore) : e.finals,
                feedback: feedback || e.feedback,
                status: 'submitted'
              }
              : e
          )
        )
        handleCloseDialog()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to submit evaluation')
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const pendingCount = evaluations.filter(e => e.status === 'pending').length
  const submittedCount = evaluations.filter(e => e.status === 'submitted').length

  return (
    <DashboardLayout userRole="teacher" userName="Prof. Maria Santos">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Student Evaluations</h1>
          <p className="text-muted-foreground mt-1">Submit grades and feedback for your students</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Evaluations</CardDescription>
              <CardTitle className="text-3xl">{pendingCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Submitted</CardDescription>
              <CardTitle className="text-3xl">{submittedCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Students</CardDescription>
              <CardTitle className="text-3xl">{evaluations.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Grade Submission</CardTitle>
            <CardDescription>Submit midterm and final grades for your students</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Midterm</TableHead>
                  <TableHead>Finals</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluations.map((evaluation) => (
                  <TableRow key={evaluation.id}>
                    <TableCell className="font-medium">{evaluation.studentName}</TableCell>
                    <TableCell>{evaluation.studentId}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{evaluation.courseCode}</p>
                        <p className="text-sm text-muted-foreground">{evaluation.courseName}</p>
                      </div>
                    </TableCell>
                    <TableCell>{evaluation.midterm ? `${evaluation.midterm}%` : '-'}</TableCell>
                    <TableCell>{evaluation.finals ? `${evaluation.finals}%` : '-'}</TableCell>
                    <TableCell>
                      {evaluation.status === 'submitted' ? (
                        <Badge className="bg-green-100 text-green-800 flex w-fit items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Submitted
                        </Badge>
                      ) : (
                        <Badge className="bg-orange-100 text-orange-800 flex w-fit items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Dialog open={open && selectedEval?.id === evaluation.id} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => handleOpenDialog(evaluation)}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            {evaluation.status === 'submitted' ? 'Edit' : 'Submit'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submit Evaluation</DialogTitle>
                            <DialogDescription>
                              {selectedEval?.studentName} - {selectedEval?.courseCode}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Midterm Grade (%)</label>
                                <Input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={midtermScore}
                                  onChange={(e) => setMidtermScore(e.target.value)}
                                  placeholder="0-100"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Finals Grade (%)</label>
                                <Input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={finalsScore}
                                  onChange={(e) => setFinalsScore(e.target.value)}
                                  placeholder="0-100"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Feedback (Optional)</label>
                              <Textarea
                                placeholder="Provide constructive feedback for the student..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="min-h-24"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={handleSubmitEvaluation}
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? 'Submitting...' : 'Submit Evaluation'}
                              </Button>
                              <Button
                                variant="outline"
                                onClick={handleCloseDialog}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
