import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectTrigger, SelectValue, SelectItem, Select, SelectContent } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em, capitalizeWords } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Product } from '@/types/product';
import { Textarea } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';
import { Category } from '@/types/category';

type Props = PropsWithChildren & {
  product?: Product;
  purpose: FormPurpose;
};

const ProductFormSheet: FC<Props> = ({ children, product, purpose }) => {
  const [open, setOpen] = useState(false);

  const { categories } = usePage<{ categories: Category[] }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    name: product?.name ?? '',
    price: product?.price ?? '',
    category_id: product?.category_id ?? '',
    description: product?.description ?? '',
    stock: product?.stock ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('product.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Product created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('product.update', product?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Product updated successfully');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{capitalizeWords(purpose)} data product</SheetTitle>
          <SheetDescription>Form untuk {purpose} data product</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama product">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Price">
              <Input type="text" placeholder="Price" value={data.price} onChange={(e) => setData('price', e.target.value)} />
            </FormControl>
            <FormControl label="Description">
              <Textarea placeholder="Description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormControl>
            <FormControl label="Stok Barang">
              <Input type="number" placeholder="Stock" value={data.stock} onChange={(e) => setData('stock', e.target.value)} />
            </FormControl>
            <FormControl label="Kategori">
              <Select value={data.category_id.toString()} onValueChange={(value) => setData('category_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} product`} loading={processing} disabled={processing} />
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X /> Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProductFormSheet;
