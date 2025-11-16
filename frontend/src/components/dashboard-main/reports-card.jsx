import React, { useEffect, useState } from 'react'
import { FileText, Calendar, User, Stethoscope } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import axios from "axios"
import toast from 'react-hot-toast'
import { createApiEndpoint } from '../../config/api'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function ReportsCard() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedReport, setSelectedReport] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(createApiEndpoint('register/report'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res.data.success) {
          setReports(res.data.reports || [])
        }
      } catch (err) {
        console.error("Error fetching reports:", err?.response || err.message || err)
        toast.error("Failed to load reports")
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [token])

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleViewReport = (report) => {
    setSelectedReport(report)
    setIsDialogOpen(true)
  }

  const recentReports = reports.slice(0, 5) // Show only 5 most recent

  return (
    <>
      <Card className="mt-6 shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Medical Reports
              </CardTitle>
              <CardDescription className="mt-1">
                Recent reports created by doctors ({reports.length} total)
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {reports.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading reports...</div>
          ) : reports.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No reports available yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.map((report) => (
                  <TableRow key={report._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">
                            {report.patient?.name || 'Unknown'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {report.patient?.age} years
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{report.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {report.description?.substring(0, 50)}...
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {report.doctor?.name || 'Unknown Doctor'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{formatDate(report.createdAt)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleViewReport(report)}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        View Details
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Report Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedReport?.title}</DialogTitle>
            <DialogDescription>
              Medical Report Details
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Patient</h4>
                  <p className="text-base">
                    {selectedReport.patient?.name || 'Unknown'} 
                    {selectedReport.patient?.age && ` (${selectedReport.patient.age} years)`}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Doctor</h4>
                  <p className="text-base">{selectedReport.doctor?.name || 'Unknown'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Date</h4>
                  <p className="text-base">{formatDate(selectedReport.createdAt)}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Consultation Date</h4>
                  <p className="text-base">{formatDate(selectedReport.consultationDate)}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Description</h4>
                <p className="text-base whitespace-pre-wrap bg-muted p-3 rounded-md">
                  {selectedReport.description}
                </p>
              </div>

              {selectedReport.diagnosis && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Diagnosis</h4>
                  <p className="text-base whitespace-pre-wrap bg-muted p-3 rounded-md">
                    {selectedReport.diagnosis}
                  </p>
                </div>
              )}

              {selectedReport.prescription && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Prescription</h4>
                  <p className="text-base whitespace-pre-wrap bg-muted p-3 rounded-md">
                    {selectedReport.prescription}
                  </p>
                </div>
              )}

              {selectedReport.recommendations && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Recommendations</h4>
                  <p className="text-base whitespace-pre-wrap bg-muted p-3 rounded-md">
                    {selectedReport.recommendations}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

