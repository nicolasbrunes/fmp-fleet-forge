import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Vehicle } from '../types/vehicle';
import { Search, Edit, Trash2, Car, Bike } from 'lucide-react';

interface VehicleListProps {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    return type === 'car' ? <Car className="w-4 h-4" /> : <Bike className="w-4 h-4" />;
  };

  const getTypeBadge = (type: string) => {
    return type === 'car' ? (
      <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
        <Car className="w-3 h-3 mr-1" />
        Carro
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
        <Bike className="w-3 h-3 mr-1" />
        Moto
      </Badge>
    );
  };

  if (vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Car className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Nenhum veículo cadastrado</h3>
        <p className="text-muted-foreground">Cadastre seu primeiro veículo para começar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por placa, modelo ou proprietário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Vehicle Table */}
      {filteredVehicles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhum veículo encontrado com os critérios de busca.</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Cor</TableHead>
                <TableHead>Proprietário</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>
                    {getTypeBadge(vehicle.type)}
                  </TableCell>
                  <TableCell className="font-mono font-semibold">
                    {vehicle.plate}
                  </TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.color}</TableCell>
                  <TableCell>{vehicle.owner}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(vehicle)}
                        className="gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Editar
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive">
                            <Trash2 className="w-3 h-3" />
                            Excluir
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o veículo <strong>{vehicle.plate}</strong>? 
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => onDelete(vehicle.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Vehicle Count */}
      <div className="text-sm text-muted-foreground text-center">
        {filteredVehicles.length === vehicles.length
          ? `${vehicles.length} veículo${vehicles.length !== 1 ? 's' : ''} cadastrado${vehicles.length !== 1 ? 's' : ''}`
          : `${filteredVehicles.length} de ${vehicles.length} veículo${vehicles.length !== 1 ? 's' : ''}`
        }
      </div>
    </div>
  );
};

export default VehicleList;