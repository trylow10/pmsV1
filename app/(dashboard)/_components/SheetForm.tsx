'use client';

import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { startTransition, useState } from 'react';
import Select from 'react-select';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SELECT_GRAY_THEME_COLOR,
  SELECT_GRAY_THEME_COLOR_PRESSED,
  options,
} from '@/constant';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { SheetSchema } from '@/validation/cloth.schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createSheet } from '@/actions/sheet/create';
import { editSheet } from '@/actions/sheet/edit';

type SheetFormProps = {
  isEditMode?: boolean;
  clothId: string;
  cloths?: {
    id: string;
    companyCloth: string;
  }[];
  data?: any;
};

function SheetForm({ clothId, isEditMode, data }: SheetFormProps) {
  const [sheetId, setSheetId] = useState('');

  const form = useForm<z.infer<typeof SheetSchema>>({
    resolver: zodResolver(SheetSchema),
    defaultValues: {
      clothId: clothId,
      cuttingDate: data?.cuttingDate,
      color: data?.color,
      thanNo: data?.thanNo,
      weightPerLenght: data?.weightPerLenght,
      palla: data?.palla,
      Size: data?.Size,
    },
  });
  //while editing quantity field size fix

  const onSubmit = async (values: z.infer<typeof SheetSchema>) => {
    startTransition(() => {
      if (isEditMode) {
        editSheet(data?.id, values)
          .then((response: any) => {
            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
            }
          })
          .catch(() => toast.error('Something went wrong'));
      } else {
        createSheet(values)
          .then((response: any) => {
            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
              setSheetId(response?.data?.id);
            }
          })
          .catch(() => toast.error('Something went wrong'));
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid xl:grid-cols-2 xl:gap-3">
              <FormField
                control={form.control}
                name="clothId"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input {...field} placeholder="clothId" type="hidden" />
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
                            field.value.some(
                              ({ type }) => type === option.value
                            )
                        )}
                        onChange={(selectedOptions) => {
                          field.onChange(
                            selectedOptions.map(({ value }) => ({
                              type: value,
                              quantity: field.value?.find(
                                (size) => size.type === value
                              )?.quantity,
                            }))
                          );
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
                          <h3>quantity</h3>
                        </header>
                        {field.value.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 justify-between border-b border-x px-3 last:rounded-b-md"
                          >
                            <span>{item.type}</span>
                            {item && (
                              <Input
                                placeholder="Quantity"
                                type="number"
                                className="w-fit my-2"
                                min={1}
                                value={item.quantity}
                                onChange={(e) => {
                                  const newSizeData = [
                                    ...(field?.value as {
                                      type: string;
                                      sheetId?: string | undefined;
                                      quantity?: number | undefined;
                                    }[]),
                                  ];
                                  newSizeData[index].quantity = parseInt(
                                    e.target.value
                                  );
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
    </>
  );
}

export default SheetForm;
