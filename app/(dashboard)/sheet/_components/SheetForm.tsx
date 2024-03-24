'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { SheetSchema } from '@/validation/cloth.schema';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { createSheet } from '@/actions/sheet/create';
import SearchCloth from '@/components/sheet/SearchCloth';

import { editSheet } from '@/actions/sheet/edit';
import SizeForm from './SizeForm';

type SheetFormProps = {
  isEditMode?: boolean;
  cloths?: any;
  data?: any;
};

function SheetForm({ cloths, isEditMode, data }: SheetFormProps) {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof SheetSchema>>({
    resolver: zodResolver(SheetSchema),
    defaultValues: {
      clothId: data?.clothId,
      cuttingDate: data?.cuttingDate.toISOString().split('T')[0],
      color: data?.color,
      thanNo: data?.thanNo,
      weightPerLenght: data?.weightPerLenght,
      palla: data?.palla,
      totalSize: data?.totalSize,
    },
  });

  const onSubmit = async (values: z.infer<typeof SheetSchema>) => {
    setError('');
    setSuccess('');
    try {
      if (isEditMode) {
        await editSheet(data.id, values);
      } else {
        await createSheet(values);
      }
      setSuccess(`Sheet ${isEditMode ? 'Edited' : 'Created'} successfully`);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="grid xl:grid-cols-2 xl:gap-3 ">
            {!isEditMode && (
              <FormField
                control={form.control}
                name="clothId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cloth </FormLabel>
                    <FormControl>
                      <SearchCloth cloths={cloths} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="cuttingDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cutting Date</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      // value={
                      //   field.value instanceof Date
                      //     ? field.value.toISOString()
                      //     : field.value
                      // }
                      defaultValue={
                        data?.cuttingDate.toISOString().split('T')[0]
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="red, blue"
                      type="text"
                      defaultValue={data?.color}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thanNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Than no</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="001"
                      type="number"
                      defaultValue={data?.thanNo}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weightPerLenght"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight Per Length</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="10 kg"
                      type="number"
                      defaultValue={data?.weightPerLenght}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="palla"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Palla</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="10 palla"
                      type="number"
                      defaultValue={data?.palla}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {!isEditMode && (
              <FormField
                control={form.control}
                name="totalSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total size</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="220 kg"
                        type="number"
                        defaultValue={data?.totalSize}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
        <SizeForm />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-fit">
          {!isEditMode ? 'Add' : 'Edit'} Sheet
        </Button>
      </form>
    </Form>
  );
}

export default SheetForm;
