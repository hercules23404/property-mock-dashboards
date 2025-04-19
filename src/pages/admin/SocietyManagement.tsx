import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Society } from "@/types/user";

export default function SocietyManagement() {
  const { user } = useAuth();
  const [societies, setSocieties] = useState<Society[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddSociety = async () => {
    // Implement add society logic
  };

  const handleAddTenant = async (societyId: string) => {
    // Implement add tenant logic
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Society Management</h1>
        <Button onClick={handleAddSociety}>Add New Society</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {societies.map((society) => (
          <Card key={society.id}>
            <CardHeader>
              <CardTitle>{society.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{society.address}</p>
                <p className="text-sm">Units: {society.totalUnits}</p>
                <p className="text-sm">Occupied: {society.occupiedUnits}</p>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => handleAddTenant(society.id)}
                >
                  Add Tenant
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
