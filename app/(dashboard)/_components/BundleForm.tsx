'use client';

import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BundleSchema } from '@/validation/cloth.schema';
import { Input } from '@/components/ui/input';

import Select from 'react-select';

// import SelectCreatable from 'react-select/creatable';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { startTransition } from 'react';
import { editBundle } from '@/actions/sheet/edit';
import { toast } from 'sonner';
import { createBundle } from '@/actions/sheet/create';
import { Button } from '@/components/ui/button';
import {
  SELECT_GRAY_THEME_COLOR,
  SELECT_GRAY_THEME_COLOR_PRESSED,
} from '@/constant';

type BundleProps = {
  data: any;
  isEditBundle?: boolean;
  sizes: {
    id: string;
    type: string;
    quantity: number;
  }[];
  workers: {
    id: string;
    name: string;
  }[];
};

function BundleForm({ data, isEditBundle, sizes, workers }: BundleProps) {
  const form = useForm<z.infer<typeof BundleSchema>>({
    resolver: zodResolver(BundleSchema),
    defaultValues: {},
  });

  const handleSubmit = async (values: z.infer<typeof BundleSchema>) => {
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

  const optionSize = sizes?.map((size: any) => ({
    label: size.type,
    value: size.id,
  })) as any;

  const optionWorker = workers?.map((woker: any) => ({
    label: woker.name,
    value: woker.id,
  })) as any;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Total Size </h2>

          <p className="text-sm text-gray-500 mb-3">RARE | BLACK | M | 100</p>
        </div>
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
                  <Input {...field} placeholder="bundleSize" type="text" />
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

          <Button type="submit">Add Bundle</Button>
        </div>
      </form>
    </Form>
  );
}

export default BundleForm;
