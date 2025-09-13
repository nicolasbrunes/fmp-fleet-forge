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
    type: 'car' as 'car' | 'motorcycle',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        plate: initialData.plate,
        model: initialData.model,
        color: initialData.color,
        owner: initialData.owner,
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
        type: 'car',
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="plate">Placa</Label>
        <Input
          id="plate"
          value={formData.plate}
          onChange={(e) => handleInputChange('plate', e.target.value.toUpperCase())}
          placeholder="ABC-1234"
          required
          className="uppercase"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Tipo</Label>
        <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="car">Carro</SelectItem>
            <SelectItem value="motorcycle">Moto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="model">Modelo</Label>
        <Input
          id="model"
          value={formData.model}
          onChange={(e) => handleInputChange('model', e.target.value)}
          placeholder="Ex: Honda Civic, Yamaha YBR"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="color">Cor</Label>
        <Input
          id="color"
          value={formData.color}
          onChange={(e) => handleInputChange('color', e.target.value)}
          placeholder="Ex: Branco, Preto, Azul"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="owner">Proprietário</Label>
        <Input
          id="owner"
          value={formData.owner}
          onChange={(e) => handleInputChange('owner', e.target.value)}
          placeholder="Nome do proprietário"
          required
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1 gap-2">
          <Save className="w-4 h-4" />
          {initialData ? 'Atualizar' : 'Cadastrar'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="gap-2">
          <X className="w-4 h-4" />
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default VehicleForm;