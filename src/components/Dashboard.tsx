import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Plus, Car, Bike } from 'lucide-react';
import VehicleForm from './VehicleForm';
import VehicleList from './VehicleList';
import { Vehicle } from '../types/vehicle';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const handleAddVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: Date.now().toString(),
    };
    setVehicles([...vehicles, newVehicle]);
    setShowForm(false);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const handleUpdateVehicle = (updatedVehicle: Omit<Vehicle, 'id'>) => {
    if (editingVehicle) {
      setVehicles(vehicles.map(v => 
        v.id === editingVehicle.id 
          ? { ...updatedVehicle, id: editingVehicle.id }
          : v
      ));
      setEditingVehicle(null);
      setShowForm(false);
    }
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingVehicle(null);
  };

  const carCount = vehicles.filter(v => v.type === 'car').length;
  const motorcycleCount = vehicles.filter(v => v.type === 'motorcycle').length;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Sistema FMP</h1>
                <p className="text-sm text-muted-foreground">Gestão de Veículos</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Veículos</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{vehicles.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carros</CardTitle>
              <Car className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{carCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Motos</CardTitle>
              <Bike className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{motorcycleCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vehicle Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  {editingVehicle ? 'Editar Veículo' : 'Cadastrar Veículo'}
                </CardTitle>
                <CardDescription>
                  {editingVehicle ? 'Atualize as informações do veículo' : 'Adicione um novo veículo ao sistema'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {(showForm || editingVehicle) ? (
                  <VehicleForm
                    onSubmit={editingVehicle ? handleUpdateVehicle : handleAddVehicle}
                    onCancel={handleCancelForm}
                    initialData={editingVehicle}
                  />
                ) : (
                  <Button onClick={() => setShowForm(true)} className="w-full gap-2">
                    <Plus className="w-4 h-4" />
                    Novo Veículo
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Vehicle List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Veículos Cadastrados</CardTitle>
                <CardDescription>
                  Lista de todos os veículos no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VehicleList
                  vehicles={vehicles}
                  onEdit={handleEditVehicle}
                  onDelete={handleDeleteVehicle}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;