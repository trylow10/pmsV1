'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { startTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { ClothSchema } from '@/validation/cloth.schema';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { createClothDesign } from '@/actions/sheet/create';
import { editCloth } from '@/actions/sheet/edit';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type ClothFormProps = {
  data: any;
  isEditCloth?: boolean;
  setModalOpen: (isOpen: boolean) => void;
};

function ClothForm({ data, isEditCloth, setModalOpen }: ClothFormProps) {
  const form = useForm<z.infer<typeof ClothSchema>>({
    resolver: zodResolver(ClothSchema),
    defaultValues: {
      companyCloth: data?.companyCloth,
    },
  });

  const onSubmit = async (values: z.infer<typeof ClothSchema>) => {
    startTransition(() => {
      if (isEditCloth) {
        editCloth(data.id, values)
          .then((response: any) => {
            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
              setModalOpen(false);
            }
          })
          .catch(() => toast.error('Something went wrong'));
      } else {
        createClothDesign(values)
          .then((response: any) => {
            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
              setModalOpen(false);
            }
          })
          .catch(() => toast.error('Something went wrong'));
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="companyCloth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Cloth</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Company Cloth"
                    type="text"
                    defaultValue={data?.companyCloth}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-fit">
            {isEditCloth ? 'Edit' : 'Add'} Cloth
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ClothForm;
