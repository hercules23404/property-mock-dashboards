import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Society } from "@/types/user";
import { firestore } from "@/lib/firebase";
import { collection, addDoc, doc, setDoc, getDocs, query, where } from "firebase/firestore";
import { Building, Users, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface SocietyFormData {
  name: string;
  address: string;
  description: string;
  contactNumber: string;
  email: string;
  totalUnits: number;
}

export default function SocietyManagement() {
  const { user, updateUserSociety } = useAuth();
  const [societies, setSocieties] = useState<Society[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SocietyFormData>({
    name: '',
    address: '',
    description: '',
    contactNumber: '',
    email: '',
    totalUnits: 0,
  });

  // Fetch societies
  useEffect(() => {
    const fetchSocieties = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const societiesRef = collection(firestore, 'societies');
        
        // Query societies where the user is an admin
        const q = query(societiesRef, where("created_by", "==", user.uid));
        const querySnapshot = await getDocs(q);
        
        const societiesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          address: doc.data().address,
          totalUnits: doc.data().totalUnits || 0,
          occupiedUnits: doc.data().occupiedUnits || 0,
          ...doc.data()
        })) as Society[];
        
        setSocieties(societiesData);
      } catch (error) {
        console.error("Error fetching societies:", error);
        toast.error("Failed to load societies");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSocieties();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === 'totalUnits') {
        return { ...prev, [name]: parseInt(value) || 0 };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleCreateSociety = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    try {
      setCreating(true);
      
      // Create society document in Firestore
      const societyData = {
        ...formData,
        created_by: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        occupiedUnits: 0,
      };
      
      const societyRef = await addDoc(collection(firestore, 'societies'), societyData);
      
      // Create user-society role in the user_roles table
      await addDoc(collection(firestore, 'user_roles'), {
        user_id: user.uid,
        society_id: societyRef.id,
        role: 'admin',
      });
      
      // Update user's society reference
      await updateUserSociety(societyRef.id);
      
      // Add this society to local state
      setSocieties(prev => [
        ...prev, 
        {
          id: societyRef.id,
          name: formData.name,
          address: formData.address,
          totalUnits: formData.totalUnits,
          occupiedUnits: 0,
          adminId: user.uid,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
      
      // Reset form & close modal
      setFormData({
        name: '',
        address: '',
        description: '',
        contactNumber: '',
        email: '',
        totalUnits: 0,
      });
      
      setOpen(false);
      toast.success("Society created successfully");
    } catch (error) {
      console.error("Error creating society:", error);
      toast.error("Failed to create society");
    } finally {
      setCreating(false);
    }
  };

  const handleAddTenant = (societyId: string) => {
    // We'll implement this in the next component
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Society Management</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Society
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Society</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateSociety} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Society Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalUnits">Total Units</Label>
                  <Input
                    id="totalUnits"
                    name="totalUnits"
                    type="number"
                    min="0"
                    value={formData.totalUnits}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={creating}>
                  {creating ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full" />
                      Creating...
                    </>
                  ) : (
                    "Create Society"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {societies.length === 0 ? (
        <Card className="p-8">
          <div className="text-center space-y-4">
            <Building className="mx-auto h-12 w-12 text-muted-foreground" />
            <CardTitle>No Societies Found</CardTitle>
            <p className="text-muted-foreground">You haven't created any society yet. Create a society to start managing your properties.</p>
            <Button onClick={() => setOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Society
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {societies.map((society) => (
            <Card key={society.id}>
              <CardHeader>
                <CardTitle>{society.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{society.address}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">Units: {society.totalUnits}</div>
                    <div className="text-sm">Occupied: {society.occupiedUnits || 0}</div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate(`/admin/tenants/${society.id}`)}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Manage Tenants
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
