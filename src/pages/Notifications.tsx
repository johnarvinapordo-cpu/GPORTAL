import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import DashboardLayout from '@/components/DashboardLayout'
import { Bell, CheckCircle, AlertCircle, Info, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface Notification {
  id: number
  type: 'enrollment' | 'grade' | 'billing' | 'evaluation' | 'system'
  title: string
  message: string
  date: string
  read: boolean
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'enrollment',
    title: 'Enrollment Approved',
    message: 'Your enrollment in CS101 has been approved. You can now access the course materials.',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: '/student/enrollment'
  },
  {
    id: 2,
    type: 'grade',
    title: 'Grades Posted',
    message: 'Your midterm grades for MATH201 have been posted. Check your dashboard for details.',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: '/student/dashboard'
  },
  {
    id: 3,
    type: 'billing',
    title: 'Payment Due',
    message: 'Your tuition payment of ₱25,000 is due on May 31, 2024. Please pay online or at the cashier.',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: 4,
    type: 'evaluation',
    title: 'Evaluation Submitted',
    message: 'Your grade submission for CS101 has been recorded. Thank you!',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: 5,
    type: 'system',
    title: 'System Maintenance',
    message: 'The portal will be under maintenance on June 1, 2024 from 2:00 AM to 4:00 AM.',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    read: true
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [userRole] = useState<'student' | 'teacher' | 'admin'>('student')

  useEffect(() => {
    // Fetch notifications from API
    // For now, using mock data
  }, [])

  const markAsRead = async (id: number) => {
    try {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('cmdi_token')}`,
        },
      })

      if (response.ok) {
        setNotifications(prev =>
          prev.map(n => n.id === id ? { ...n, read: true } : n)
        )
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  const deleteNotification = async (id: number) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('cmdi_token')}`,
        },
      })

      if (response.ok) {
        setNotifications(prev => prev.filter(n => n.id !== id))
        toast.success('Notification deleted')
      }
    } catch (error) {
      toast.error('Failed to delete notification')
    }
  }

  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/notifications/read-all', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('cmdi_token')}`,
        },
      })

      if (response.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
        toast.success('All notifications marked as read')
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'enrollment':
        return <CheckCircle className="w-5 h-5 text-blue-500" />
      case 'grade':
        return <AlertCircle className="w-5 h-5 text-green-500" />
      case 'billing':
        return <AlertCircle className="w-5 h-5 text-orange-500" />
      case 'evaluation':
        return <CheckCircle className="w-5 h-5 text-purple-500" />
      default:
        return <Info className="w-5 h-5 text-slate-500" />
    }
  }

  const getNotificationBadgeColor = (type: string) => {
    switch (type) {
      case 'enrollment':
        return 'bg-blue-100 text-blue-800'
      case 'grade':
        return 'bg-green-100 text-green-800'
      case 'billing':
        return 'bg-orange-100 text-orange-800'
      case 'evaluation':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <DashboardLayout userRole={userRole} userName="Juan Dela Cruz">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground mt-1">Stay updated with important announcements and alerts</p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline">
              Mark all as read
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Unread</CardDescription>
              <CardTitle className="text-3xl">{unreadCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total</CardDescription>
              <CardTitle className="text-3xl">{notifications.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Read</CardDescription>
              <CardTitle className="text-3xl">{notifications.length - unreadCount}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-3">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No notifications yet</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{notification.title}</h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <Badge className={`${getNotificationBadgeColor(notification.type)} mt-1`}>
                            {notification.type}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground flex-shrink-0 ml-2">
                          {formatDate(notification.date)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{notification.message}</p>
                      {notification.actionUrl && (
                        <a href={notification.actionUrl} className="text-sm text-blue-600 hover:underline mt-2 inline-block">
                          View Details →
                        </a>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNotification(notification.id)
                      }}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
