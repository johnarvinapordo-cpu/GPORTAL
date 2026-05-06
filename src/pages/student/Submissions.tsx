// @ts-nocheck
import { useState } from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Upload, FileText, CheckCircle, Clock } from 'lucide-react'
import { toast } from 'sonner'


interface Assignment {
  id: number
  code: string
  title: string
  dueDate: string
  status: 'pending' | 'submitted' | 'graded'
  submittedDate?: string
  grade?: number
}

const mockAssignments: Assignment[] = [
  { id: 1, code: 'CS101', title: 'Programming Assignment 1', dueDate: '2024-05-15', status: 'submitted', submittedDate: '2024-05-14', grade: 95 },
  { id: 2, code: 'CS101', title: 'Programming Assignment 2', dueDate: '2024-05-22', status: 'pending' },
  { id: 3, code: 'MATH201', title: 'Calculus Problem Set', dueDate: '2024-05-18', status: 'submitted', submittedDate: '2024-05-18' },
  { id: 4, code: 'ENG101', title: 'Essay Submission', dueDate: '2024-05-25', status: 'pending' },
]

export default function SubmissionsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments)
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [submissionText, setSubmissionText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSubmit = async () => {
    if (!selectedAssignment) return
    
    if (!submissionText.trim()) {
      toast.error('Please enter submission content')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/submit-assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('cmdi_token')}`,
        },
        body: JSON.stringify({
          assignmentId: selectedAssignment.id,
          content: submissionText,
        }),
      })

      if (response.ok) {
        toast.success('Assignment submitted successfully!')
        setAssignments(prev =>
          prev.map(a =>
            a.id === selectedAssignment.id
              ? { ...a, status: 'submitted', submittedDate: new Date().toISOString().split('T')[0] }
              : a
          )
        )
        setSubmissionText('')
        setSelectedAssignment(null)
        setOpen(false)
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to submit assignment')
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800'
      case 'graded':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
      case 'graded':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const pendingCount = assignments.filter(a => a.status === 'pending').length
  const submittedCount = assignments.filter(a => a.status === 'submitted').length
  const gradedCount = assignments.filter(a => a.status === 'graded').length

  return (
    <DashboardLayout userRole="student" userName="Juan Dela Cruz">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Assignment Submissions</h1>
          <p className="text-muted-foreground mt-1">Submit and track your course assignments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending</CardDescription>
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
              <CardDescription>Graded</CardDescription>
              <CardTitle className="text-3xl">{gradedCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total</CardDescription>
              <CardTitle className="text-3xl">{assignments.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Assignments</CardTitle>
            <CardDescription>View and submit your course assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">{assignment.code}</TableCell>
                    <TableCell>{assignment.title}</TableCell>
                    <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(assignment.status)}
                        <Badge className={getStatusColor(assignment.status)}>
                          {assignment.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{assignment.submittedDate || '-'}</TableCell>
                    <TableCell>{assignment.grade ? `${assignment.grade}%` : '-'}</TableCell>
                    <TableCell>
                      {assignment.status === 'pending' && (
                        <Dialog open={open && selectedAssignment?.id === assignment.id} onOpenChange={setOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedAssignment(assignment)
                                setOpen(true)
                              }}
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Submit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Submit Assignment</DialogTitle>
                              <DialogDescription>
                                {assignment.title} - {assignment.code}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Textarea
                                placeholder="Enter your assignment submission..."
                                value={submissionText}
                                onChange={(e) => setSubmissionText(e.target.value)}
                                className="min-h-40"
                              />
                              <div className="flex gap-2">
                                <Button
                                  onClick={handleSubmit}
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedAssignment(null)
                                    setSubmissionText('')
                                    setOpen(false)
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      {assignment.status !== 'pending' && (
                        <Button size="sm" variant="outline" disabled>
                          <FileText className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      )}
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
