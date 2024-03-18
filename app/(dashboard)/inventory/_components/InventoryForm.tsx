'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { InventorySchema } from '@/validation/inventory.schema';
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
import { createInventory } from '@/actions/inventory/createInventory';
import { useCurrentUser } from '@/hooks/use-current-user';

// Ssize           Int
// Msize           Int
// Lsize           Int
// XLsize          Int
// XXLsize         Int
// XXXLsize        Int
// freeSize        Int

function InventoryForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const user = useCurrentUser();

  const form = useForm<z.infer<typeof InventorySchema>>({
    resolver: zodResolver(InventorySchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof InventorySchema>) => {
    setError('');
    setSuccess('');
    console.log(values, 'asa');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="grid xl:grid-cols-2 xl:gap-3 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Rare" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      value={
                        field.value instanceof Date
                          ? field.value.toISOString()
                          : field.value
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
                    <Input {...field} placeholder="red, blue" type="text" />
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
                    <Input {...field} placeholder="001" type="number" />
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
                    <Input {...field} placeholder="10 kg" type="number" />
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
                    <Input {...field} placeholder="10 palla" type="number" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total size</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="220 kg" type="number" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="hidden" value={user?.id} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-fit">
          Add Inventory
        </Button>
      </form>
    </Form>
  );
}

export default InventoryForm;
