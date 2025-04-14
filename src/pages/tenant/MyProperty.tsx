
import React from "react";
import { Home, Map, Camera, Download, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockProperties } from "@/utils/mockData";

const MyProperty = () => {
  // Assume tenant is at Sunset Apartments, unit A-101
  const property = mockProperties[0];
  
  return (
    <DashboardLayout role="tenant">
      <div className="space-y-6">
        <PageHeader 
          title="My Property"
          description="Details about your rental property and amenities"
        />
        
        <Tabs defaultValue="property">
          <TabsList>
            <TabsTrigger value="property">Property Details</TabsTrigger>
            <TabsTrigger value="unit">My Unit</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="property" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{property.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{property.address}</p>
                    <p className="mb-4">
                      Sunset Apartments offers modern living spaces with excellent 
                      amenities including a swimming pool, fitness center, and landscaped 
                      courtyard. Located in a vibrant neighborhood with easy access to 
                      shopping, dining, and entertainment.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <h3 className="font-semibold mb-2">Property Type</h3>
                        <p>{property.type}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Year Built</h3>
                        <p>2018</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Total Units</h3>
                        <p>{property.units}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Floors</h3>
                        <p>4</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square w-full bg-muted flex items-center justify-center">
                      <Map className="h-12 w-12 text-muted-foreground" />
                      <span className="sr-only">Map</span>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Address</h3>
                      <p className="mb-4">{property.address}</p>
                      <Button className="w-full gap-2">
                        <Map className="h-4 w-4" />
                        View on Maps
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Community Rules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Quiet hours: 10 PM - 8 AM</li>
                      <li>No smoking in common areas</li>
                      <li>Pets must be leashed in common areas</li>
                      <li>Pool hours: 8 AM - 10 PM</li>
                      <li>Parking in designated spaces only</li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4 gap-2">
                      <Download className="h-4 w-4" />
                      Download Full Rules
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="unit" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Unit A-101</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">Unit Details</h3>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Bedrooms:</span>
                            <span>2</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Bathrooms:</span>
                            <span>2</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Square Footage:</span>
                            <span>950 sq ft</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Floor:</span>
                            <span>1st Floor</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">Lease Information</h3>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Move-in Date:</span>
                            <span>Jan 15, 2023</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Lease End:</span>
                            <span>Jan 14, 2024</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Monthly Rent:</span>
                            <span>$1,250</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Due Date:</span>
                            <span>1st of month</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="md:col-span-2">
                        <h3 className="font-semibold mb-2">Unit Features</h3>
                        <ul className="grid grid-cols-2 gap-2">
                          <li>• Modern kitchen appliances</li>
                          <li>• In-unit washer & dryer</li>
                          <li>• Air conditioning</li>
                          <li>• Hardwood flooring</li>
                          <li>• Balcony</li>
                          <li>• Walk-in closet</li>
                          <li>• Ceiling fans</li>
                          <li>• High-speed internet ready</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-semibold mb-2">Unit Photos</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                          <Camera className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                          <Camera className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                          <Camera className="h-6 w-6 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Utilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Electricity</span>
                          <span>Tenant pays</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Provider: City Power & Light
                        </p>
                      </li>
                      <li>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Water/Sewer</span>
                          <span>Included</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Building managed
                        </p>
                      </li>
                      <li>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Internet</span>
                          <span>Tenant pays</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Available providers: Comcast, AT&T
                        </p>
                      </li>
                      <li>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Gas</span>
                          <span>Included</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Building managed
                        </p>
                      </li>
                      <li>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Trash</span>
                          <span>Included</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Collection days: Monday, Thursday
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Button variant="outline" className="w-full mt-4 gap-2">
                  <Download className="h-4 w-4" />
                  Download Floor Plan
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="amenities" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AmenityCard 
                name="Swimming Pool"
                description="Heated outdoor pool with lounge area"
                hours="8:00 AM - 10:00 PM"
              />
              <AmenityCard 
                name="Fitness Center"
                description="Modern equipment and free weights"
                hours="24/7 Access"
              />
              <AmenityCard 
                name="Courtyard Garden"
                description="Landscaped outdoor space with seating"
                hours="Open All Day"
              />
              <AmenityCard 
                name="Community Room"
                description="Available for resident events"
                hours="9:00 AM - 9:00 PM"
              />
              <AmenityCard 
                name="Package Room"
                description="Secure package delivery and storage"
                hours="24/7 Access with Key Fob"
              />
              <AmenityCard 
                name="Covered Parking"
                description="Reserved spots available"
                hours="Always Available"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="contacts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ContactCard 
                name="Property Manager"
                contactName="Alex Morgan"
                phone="(555) 123-4567"
                email="alex.morgan@propertymanagement.com"
              />
              <ContactCard 
                name="Maintenance"
                contactName="Maintenance Team"
                phone="(555) 234-5678"
                email="maintenance@propertymanagement.com"
              />
              <ContactCard 
                name="Leasing Office"
                contactName="Leasing Team"
                phone="(555) 345-6789"
                email="leasing@propertymanagement.com"
              />
              <ContactCard 
                name="After-Hours Emergency"
                contactName="Emergency Service"
                phone="(555) 911-0011"
                email="emergency@propertymanagement.com"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const AmenityCard = ({ name, description, hours }: { name: string, description: string, hours: string }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div>
          <p className="text-sm font-medium">Hours:</p>
          <p className="text-sm">{hours}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const ContactCard = ({ name, contactName, phone, email }: { name: string, contactName: string, phone: string, email: string }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <p className="mb-3">{contactName}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <p>{phone}</p>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm truncate">{email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyProperty;
