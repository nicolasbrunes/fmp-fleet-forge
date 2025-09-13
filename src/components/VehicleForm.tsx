import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Vehicle } from '../types/vehicle';
import { Save, X } from 'lucide-react';

interface VehicleFormProps {
  onSubmit: (vehicle: Omit<Vehicle, 'id'>) => void;
  onCancel: () => void;
  initialData?: Vehicle | null;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    plate: '',
    model: '',
    color: '',
    owner: '',
    phone: '',
    type: 'car' as 'car' | 'motorcycle',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        plate: initialData.plate,
        model: initialData.model,
        color: initialData.color,
        owner: initialData.owner,
        phone: initialData.phone,
        type: initialData.type,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Reset form if not editing
    if (!initialData) {
      setFormData({
        plate: '',
        model: '',
        color: '',
        owner: '',
        phone: '',
        type: 'car',
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-2 border-primary/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center pb-2 border-b border-border/50">
          <h3 className="text-lg font-semibold text-foreground">
            {initialData ? 'Editar Veículo' : 'Cadastro de Veículo'}
          </h3>
        </div>

        {/* Grid Layout for better organization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="plate" className="text-sm font-medium text-foreground">Placa</Label>
            <Input
              id="plate"
              value={formData.plate}
              onChange={(e) => handleInputChange('plate', e.target.value.toUpperCase())}
              placeholder="ABC-1234"
              required
              className="uppercase font-mono tracking-wider"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-foreground">Tipo</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">🚗 Carro</SelectItem>
                <SelectItem value="motorcycle">🏍️ Moto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model" className="text-sm font-medium text-foreground">Modelo</Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              placeholder="Ex: Honda Civic, Yamaha YBR"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color" className="text-sm font-medium text-foreground">Cor</Label>
            <Input
              id="color"
              value={formData.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              placeholder="Ex: Branco, Preto, Azul"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner" className="text-sm font-medium text-foreground">Proprietário</Label>
            <Input
              id="owner"
              value={formData.owner}
              onChange={(e) => handleInputChange('owner', e.target.value)}
              placeholder="Nome do proprietário"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-foreground">Telefone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(11) 99999-9999"
              required
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border/50">
          <Button type="submit" className="flex-1 gap-2 bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4" />
            {initialData ? 'Atualizar Veículo' : 'Cadastrar Veículo'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="gap-2 min-w-[120px]">
            <X className="w-4 h-4" />
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default VehicleForm;