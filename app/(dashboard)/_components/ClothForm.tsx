'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { startTransition, useState } from 'react';
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

import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { createClothDesign } from '@/actions/sheet/create';
import { editCloth } from '@/actions/sheet/edit';
import { Button } from '@/components/ui/button';

type ClothFormProps = {
  data: any;
  isEditCloth?: boolean;
};

function ClothForm({ data, isEditCloth }: ClothFormProps) {
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

    startTransition(() => {
      if (isEditCloth) {
        editCloth(data.id, values)
          .then((response: any) => {
            if (response?.error) {
              setError(response?.error);
            } else if (response?.message) {
              setSuccess(response?.message);
            }
          })
          .catch(() => setError('Something went wrong'));
      } else {
        createClothDesign(values)
          .then((response: any) => {
            if (response?.error) {
              setError(response?.error);
            } else if (response?.message) {
              console.log(response?.message);
              setSuccess(response?.message);
            }
          })
          .catch(() => setError('Something went wrong'));
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

        <FormError message={error} />
        <FormSuccess message={success} />
      </form>
    </Form>
  );
}

export default ClothForm;
