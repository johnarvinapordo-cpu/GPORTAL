import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export default function EvaluationsPage() {

  const [midterm, setMidterm] = useState("")
  const [finals, setFinals] = useState("")
  const [feedback, setFeedback] = useState("")
  const [open, setOpen] = useState(false)

  const evaluations = [
    { id: 1, student: "Juan Dela Cruz", course: "CS101", midterm: 85, finals: 90, status: "submitted" },
    { id: 2, student: "Maria Santos", course: "CS101", status: "pending" },
    { id: 3, student: "Pedro Reyes", course: "CS201", status: "pending" },
  ]

  const openDialog = (e: any) => {
    setMidterm(e.midterm || "")
    setFinals(e.finals || "")
    setFeedback("")
    setOpen(true)
  }

  const submit = () => {
    toast.success("Evaluation saved")
    setOpen(false)
  }

  return (
    <DashboardLayout userRole="teacher" userName="Professor">

      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">Evaluations</h1>
          <p className="text-muted-foreground">Submit student grades and feedback</p>
        </div>

        {/* TABLE */}
        <div className="bg-card border rounded-xl p-4">

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {evaluations.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.student}</TableCell>
                  <TableCell>{e.course}</TableCell>

                  <TableCell>
                    {e.status === "submitted" ? (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Submitted
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-100 text-orange-700">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <Button size="sm" onClick={() => openDialog(e)}>
                      {e.status === "submitted" ? "Edit" : "Grade"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* DIALOG */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Student Evaluation</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">

              <Input
                placeholder="Midterm"
                value={midterm}
                onChange={(e) => setMidterm(e.target.value)}
              />

              <Input
                placeholder="Finals"
                value={finals}
                onChange={(e) => setFinals(e.target.value)}
              />

              <Textarea
                placeholder="Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <Button onClick={submit} className="w-full">
                Save Evaluation
              </Button>

            </div>

          </DialogContent>
        </Dialog>

      </div>

    </DashboardLayout>
  )
}