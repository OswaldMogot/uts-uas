import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder, ShoppingCart } from 'lucide-react';
import { FC } from 'react';
import { Product } from '@/types/product';
import { Link } from '@inertiajs/react';
import ProductFormSheet from './product-form-sheet';
import ProductDeleteDialog from './product-delete-dialog';

type Props = {
  product: Product;
};

    const ProductItemCard: FC<Props> = ({ product }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground">
          ID: {product.id}
        </p>
      </CardHeader>
      <CardContent>
        <button><ShoppingCart /> add to cart</button>
      </CardContent> {/* Ditambahkan tag penutup */}
    </Card>
  );
}; 

export default ProductItemCard;
