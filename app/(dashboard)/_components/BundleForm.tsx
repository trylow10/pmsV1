'use client';

import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useState } from 'react';
import { toast } from 'sonner';
import Select from 'react-select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { editBundle } from '@/actions/sheet/edit';
import { createBundle } from '@/actions/sheet/create';
import { BundleSchema } from '@/validation/cloth.schema';

import { generateTheme } from '@/constant';

type BundleProps = {
  data: any;
  isEditBundle?: boolean;
  Sizes: {
    id: string;
    type: string;
    quantity: number;
  }[];
  workers?: {
    id: string;
    name: string;
  }[];
  cloth: string;
};

function BundleForm({
  data,
  isEditBundle,
  workers,
  Sizes,
  cloth,
}: BundleProps) {
  const form = useForm<z.infer<typeof BundleSchema>>({
    resolver: zodResolver(BundleSchema),
    defaultValues: {
      sizeId: data?.sizeId,
      bundleSize: data?.bundleSize,
      sheetId: data?.sheetId,
      assignedDate: data?.assignedDate,
      assignedToId: data?.assignedToId,
    },
  });

  const onSubmit = async (values: z.infer<typeof BundleSchema>) => {
    startTransition(() => {
      if (isEditBundle) {
        editBundle(data?.id, values)
          .then((response: any) => {
            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
            }
          })
          .catch(() => toast.error('Something went wrong'));
      } else {
        createBundle(values)
          .then((response: any) => {
            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
            }
          })
          .catch(() => toast.error('Something went wrong'));
      }
    });
  };

  // const [selectedSize, setSelectedSize] = useState<{
  //   type: string;
  //   quantity: number;
  // } | null>(null);

  const optionSize = Sizes?.map((size: any) => ({
    label: size.type,
    value: size.id,
    quantity: size.quantity,
  })) as any;

  // const [bundleSize, setBundleSize] = useState<number>(0);
  // const [bundles, setBundles] = useState<number[]>([]);

  // const calculateBundles = (quantity: number, bundleSize: number) => {
  //   let remainingQuantity = quantity;
  //   let possibleBundles: number[] = [];

  //   while (remainingQuantity >= bundleSize) {
  //     possibleBundles.push(bundleSize);
  //     remainingQuantity -= bundleSize;
  //   }

  //   setBundles(possibleBundles);
  // };

  // const optionWorker = workers?.map((woker: any) => ({
  //   label: woker.name,
  //   value: woker.id,
  // })) as any;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* <div>
  <h2 className="text-xl font-semibold mb-2">Total Size </h2>
  <p className="text-sm text-gray-500 mb-3">
    {cloth.toUpperCase()} | {data.color.toUpperCase()} |{' '}
    {selectedSize?.type.toUpperCase()} | {selectedSize?.quantity}
  </p>
  {bundles.map((bundle, index) => (
    <div key={index}>Bundle: {bundle}</div>
  ))}
</div>; */}

        <div className="space-y-4">
          <Controller
            control={form.control}
            name="sizeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Select
                    options={optionSize}
                    theme={generateTheme}
                    onChange={(option) => {
                      field.onChange(option?.value);
                      // setSelectedSize({
                      //   type: option?.label,
                      //   quantity: option?.quantity,
                      // });
                      // calculateBundles(option?.quantity, bundleSize);
                    }}
                    value={optionSize?.find(
                      (option: any) => option.value === field.value
                    )}
                    required
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
                    // onChange={(e) => {
                    //   field.onChange(e);
                    //   setBundleSize(Number(e.target.value));
                    //   // calculateBundles(
                    //   //   selectedSize?.quantity || 0,
                    //   //   Number(e.target.value)
                    //   // );

                    // }}

                    type="number"
                    required
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

          {/* <FormField
            control={form.control}
            name="assignedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split('T')[0]
                        : ''
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* 
          <Controller
            control={form.control}
            name="assignedToId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assign To</FormLabel>
                <FormControl>
                  <SelectCreatable
                    options={optionWorker}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 6,
                      colors: {
                        ...theme.colors,
                        primary: '#3333334e',
                        primary25: SELECT_GRAY_THEME_COLOR,
                        dangerLight: '#f1c0c0',
                        danger: '#5d3535',
                        primary50: SELECT_GRAY_THEME_COLOR_PRESSED,
                      },
                    })}
                    onChange={(option) => field.onChange(option?.value)}
                    value={optionWorker?.find(
                      (option: any) => option.value === field.value
                    )}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <div className="w-full mt-8 h-fit">
            <Button type="submit" className="h-fit">
              {!isEditBundle ? 'Add' : 'Edit'} Bundle
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default BundleForm;
