
import React, { useState, useEffect } from "react";
import { Home, FileText, Wrench, Bell } from "lucide-react";
import { firestore } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import StatisticsCard from '@/components/dashboard/StatisticsCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TenantDashboard = () => {
  const { user } = useAuth();
  const [societyData, setSocietyData] = useState<any>(null);
  const [noticeCount, setNoticeCount] = useState(0);
  const [maintenanceCount, setMaintenanceCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.societyId) {
        setLoading(false);
        return;
      }
      
      try {
        // Fetch society data
        const societyDoc = await getDoc(doc(firestore, 'societies', user.societyId));
        if (societyDoc.exists()) {
          setSocietyData(societyDoc.data());
        }
        
        // Fetch unread notices count
        const noticesRef = collection(firestore, 'notices');
        const noticesQuery = query(
          noticesRef, 
          where('societyId', '==', user.societyId),
          where('isActive', '==', true)
        );
        const noticesSnapshot = await getDocs(noticesQuery);
        setNoticeCount(noticesSnapshot.docs.length);
        
        // Fetch active maintenance requests count
        const maintenanceRef = collection(firestore, 'maintenanceRequests');
        const maintenanceQuery = query(
          maintenanceRef,
          where('userId', '==', user.uid),
          where('status', 'in', ['pending', 'in_progress'])
        );
        const maintenanceSnapshot = await getDocs(maintenanceQuery);
        setMaintenanceCount(maintenanceSnapshot.docs.length);
      } catch (error) {
        console.error("Error fetching tenant data:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user?.societyId) {
    return (
      <div className="p-6">
        <Card className="p-8">
          <div className="text-center space-y-4">
            <Home className="mx-auto h-12 w-12 text-muted-foreground" />
            <CardTitle>No Society Assigned</CardTitle>
            <p className="text-muted-foreground">
              You are not currently assigned to any society. Please contact your property manager.
            </p>
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tenant Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Here's an overview of your property.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticsCard
          title="My Property"
          value={societyData?.name || "Loading..."}
          icon={<Home className="h-8 w-8" />}
          description={societyData?.address || ""}
        />
        <StatisticsCard
          title="Active Requests"
          value={maintenanceCount.toString()}
          icon={<Wrench className="h-8 w-8" />}
        />
        <StatisticsCard
          title="Unread Notices"
          value={noticeCount.toString()}
          icon={<Bell className="h-8 w-8" />}
        />
        <StatisticsCard
          title="My Documents"
          value="3"
          icon={<FileText className="h-8 w-8" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Important Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="font-medium">Rent Due</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs">
                  {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString()}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Society Meeting</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs">
                  {new Date(new Date().getFullYear(), new Date().getMonth(), 15).toLocaleDateString()}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Maintenance Inspection</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs">
                  {new Date(new Date().getFullYear(), new Date().getMonth(), 20).toLocaleDateString()}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="border-l-2 border-primary pl-4 py-1">
                <p className="font-medium">New notice posted</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </li>
              <li className="border-l-2 border-primary pl-4 py-1">
                <p className="font-medium">Maintenance request updated</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </li>
              <li className="border-l-2 border-primary pl-4 py-1">
                <p className="font-medium">Society meeting announced</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Notices</CardTitle>
        </CardHeader>
        <CardContent>
          {noticeCount > 0 ? (
            <ul className="space-y-4">
              <li className="p-4 border rounded-md hover:bg-accent">
                <div className="flex justify-between">
                  <p className="font-medium">Important Community Update</p>
                  <span className="bg-red-100 text-red-800 px-2 rounded-md text-xs">Important</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Posted 2 days ago</p>
              </li>
              <li className="p-4 border rounded-md hover:bg-accent">
                <div className="flex justify-between">
                  <p className="font-medium">Water Shutdown Notice</p>
                  <span className="bg-yellow-100 text-yellow-800 px-2 rounded-md text-xs">Maintenance</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Posted 5 days ago</p>
              </li>
            </ul>
          ) : (
            <p className="text-center text-muted-foreground py-4">No recent notices</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantDashboard;
