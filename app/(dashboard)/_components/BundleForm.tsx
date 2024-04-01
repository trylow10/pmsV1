'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BundleSchema } from '@/validation/cloth.schema';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type BundleProps = {
  data: any;
  isEditBundle?: boolean;
  setBundleData: (data: any) => void;
};

function BundleForm({ setBundleData, data, isEditBundle }: BundleProps) {
  const form = useForm<z.infer<typeof BundleSchema>>({
    resolver: zodResolver(BundleSchema),
    defaultValues: {
      bundleId: data?.bundleId,
      sizeId: data?.sizeId,
      bundleSize: data?.bundleSize,
      sheetId: data?.sheetId,
    },
  });

  console.log(data);

  const handleChange = (e: any) => {
    setBundleData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="bundleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BundleId</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="bundleId"
                    type="text"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizeId"
            render={({ field }) => (
              <FormItem style={{ display: 'none' }}>
                <FormLabel>SizeId</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="sizeId"
                    type="text"
                    defaultValue={data?.sizeId}
                    hidden
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bundleSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BundleSize</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="bundleSize"
                    type="text"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sheetId"
            render={({ field }) => (
              <FormItem style={{ display: 'none' }}>
                <FormLabel>SheetId</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="sheetId"
                    type="text"
                    defaultValue={data?.sheetId}
                    hidden
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}

export default BundleForm;
