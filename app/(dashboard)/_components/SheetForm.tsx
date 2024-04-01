'use client';

import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { startTransition, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select';

import {
  SELECT_GRAY_THEME_COLOR,
  SELECT_GRAY_THEME_COLOR_PRESSED,
  options,
} from '@/constant';

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
import { createSheet } from '@/actions/sheet/create';

import { editSheet } from '@/actions/sheet/edit';
import { toast } from 'sonner';
import { BundleAction } from './BundleAction';
import { TBundle } from '@/types/cloth.types';

type SheetFormProps = {
  isEditMode?: boolean;
  cloths?: {
    id: string;
    companyCloth: string;
  }[];
  data?: any;
};

function SheetForm({ cloths, isEditMode, data }: SheetFormProps) {
  const [bundleData, setBundleData] = useState([]);
  const form = useForm<z.infer<typeof SheetSchema>>({
    resolver: zodResolver(SheetSchema),
    defaultValues: {
      clothId: data?.clothId,
      cuttingDate: data?.cuttingDate,
      color: data?.color,
      thanNo: data?.thanNo,
      weightPerLenght: data?.weightPerLenght,
      palla: data?.palla,
      Size: data?.Size,
      Bundle: data?.Bundle,
    },
  });

  console.log('bundle ko data', bundleData);
  //  { type: 'm', quantity: 0, Bundle: [ { bundleId: '100'} ] }

  const onSubmit = async (values: z.infer<typeof SheetSchema>) => {
    const valuesWithBundleData = [
      {
        ...values,
        Bundle: bundleData.map((bundle) => ({ bundle } as unknown as TBundle)),
      },
    ];

    startTransition(() => {
      if (isEditMode) {
        editSheet(data?.id, valuesWithBundleData)
          .then((response: any) => {
            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
            }
          })
          .catch(() => toast.error('Something went wrong'));
      } else {
        const valuesWithBundleData = {
          cuttingDate: form.getValues('cuttingDate'),
          color: form.getValues('color'),
          thanNo: form.getValues('thanNo'),
          weightPerLenght: form.getValues('weightPerLenght'),
          palla: form.getValues('palla'),
          clothId: form.getValues('clothId'),
          Size: form.getValues('Size'),
          Bundle: bundleData,
        };

        createSheet(valuesWithBundleData)
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

  const optionCloth = cloths?.map((cloth) => ({
    label: cloth.companyCloth,
    value: cloth.id,
  })) as any;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="grid xl:grid-cols-2 xl:gap-3">
            {!isEditMode && (
              <Controller
                control={form.control}
                name="clothId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cloth</FormLabel>
                    <FormControl>
                      <Select
                        options={optionCloth}
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
                        value={optionCloth?.find(
                          (option: any) => option.value === field.value
                        )}
                        required
                      />
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
                      placeholder="color of sheet"
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
                      placeholder="number of than"
                      type="number"
                      defaultValue={data?.thanNo}
                      min={1}
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
                      placeholder="number of kg / m"
                      type="number"
                      min={1}
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
                      placeholder="Number of palla"
                      type="number"
                      min={1}
                      defaultValue={data?.palla}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="Size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Select
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 6,
                        colors: {
                          ...theme.colors,
                          primary25: SELECT_GRAY_THEME_COLOR,
                          neutral10: SELECT_GRAY_THEME_COLOR,
                          dangerLight: '#f1c0c0',
                          danger: '#5d3535',
                          primary: SELECT_GRAY_THEME_COLOR,
                          primary50: SELECT_GRAY_THEME_COLOR_PRESSED,
                        },
                      })}
                      value={options[0].options.filter(
                        (option) =>
                          field.value &&
                          field.value.some(({ type }) => type === option.value)
                      )}
                      onChange={(selectedOptions) => {
                        const newData = selectedOptions.map(({ value }) => {
                          const existingItem = field.value?.find(
                            (size) => size.type === value
                          );
                          return {
                            type: value,
                            quantity: existingItem?.quantity ?? 0,
                            Bundle: Array.isArray(existingItem?.Bundle)
                              ? existingItem?.Bundle
                              : [bundleData],
                          };
                        });

                        console.log(newData); // Log the new data
                        field.onChange(newData);
                      }}
                      options={options[0].options}
                      isMulti
                    />
                  </FormControl>
                  <FormMessage />
                  {field.value && field.value.length > 0 && (
                    <div>
                      <header className="flex justify-between items-center border p-2 rounded-t-md">
                        <h3>size</h3>
                        <h3>action</h3>
                        {/* <h3>quantity</h3> */}
                      </header>
                      {field.value.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border-b border-x px-3  last:rounded-b-md"
                        >
                          <span>{item.type}</span>
                          <BundleAction
                            data={item}
                            isEditBundle
                            setBundleData={setBundleData}
                          />
                          {item && (
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const newSizeData = [
                                  ...(field?.value as {
                                    type: string;
                                    sheetId?: string | undefined;
                                    quantity?: number | undefined;
                                    Bundle?: TBundle | undefined;
                                  }[]),
                                ];
                                console.log(newSizeData);
                                field.onChange(newSizeData);
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </FormItem>
              )}
            />
            <div className="w-full mt-8 h-fit">
              <Button type="submit" className="h-fit">
                {!isEditMode ? 'Add' : 'Edit'} Sheet
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default SheetForm;
