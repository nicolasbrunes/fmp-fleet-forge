export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  color: string;
  owner: string;
  type: 'car' | 'motorcycle';
}