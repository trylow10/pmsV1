'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { ClothSchema } from '@/validation/inventory.schema';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { createClothDesign } from '@/actions/sheet/create';
import { editCloth } from '@/actions/sheet/edit';
import { Button } from '@/components/ui/button';

type ClothFormProps = {
  isEditMode: boolean;
  data: any;
};

function ClothForm({ data, isEditMode }: ClothFormProps) {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof ClothSchema>>({
    resolver: zodResolver(ClothSchema),
    defaultValues: {
      companyCloth: data?.companyCloth,
    },
  });

  const onSubmit = async (values: z.infer<typeof ClothSchema>) => {
    setError('');
    setSuccess('');
    try {
      if (isEditMode) {
        await editCloth(data.id, values);
      } else {
        await createClothDesign(values);
      }
      setSuccess(`Cloth ${isEditMode ? 'Edited' : 'Created'} successfully`);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="grid xl:grid-cols-2 xl:gap-3 ">
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
          </div>
          <Button type="submit" className="w-fit">
            {!isEditMode ? 'Add' : 'Edit'} Cloth
          </Button>
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />
      </form>
    </Form>
  );
}

export default ClothForm;
