'use client';

import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select';

import { options } from '@/constant';

import { Pencil1Icon } from '@radix-ui/react-icons';

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

import { editSheet } from '@/actions/sheet/edit';
import { TSheet } from '@/types/cloth.types';

type SheetFormProps = {
  isEditMode?: boolean;
  cloths?: {
    id: string;
    companyCloth: string;
  }[];
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
        await editSheet(data?.id, { ...values, Size: form.getValues('Size') });
      } else {
        await createSheet({ ...values, Size: form.getValues('Size') });
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
          <div className="grid xl:grid-cols-2 xl:gap-3">
            {!isEditMode && (
              <FormField
                control={form.control}
                name="clothId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cloth</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-transparent w-full border rounded h-fit p-2"
                      >
                        <option className="">select cloth</option>
                        {cloths?.map((cloth) => (
                          <option key={cloth.id} value={cloth.id}>
                            {cloth.companyCloth}
                          </option>
                        ))}
                      </select>
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
                      min={0}
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
                      min={0}
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
                      min={0}
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
                          primary25: '#8f8f8f20',
                          primary: 'none',
                        },
                      })}
                      value={options[0].options.filter(
                        (option) =>
                          field.value &&
                          field.value.some(({ type }) => type === option.value)
                      )}
                      onChange={(selectedOptions) => {
                        field.onChange(
                          selectedOptions.map(({ value }) => ({
                            type: value,
                            quantity:
                              field.value?.find((size) => size.type === value)
                                ?.quantity ?? 0,
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
                      <header className="flex justify-between items-center border p-2">
                        <h3>size</h3>
                        <h3>action</h3>
                        {/* <h3>quantity</h3> */}
                      </header>
                      {field.value.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-[#8f8f8f20] px-3"
                        >
                          <span>{item.type}</span>
                          <Button variant="ghost" type="button">
                            <Pencil1Icon stroke="2" />
                          </Button>
                          {/* {item && (
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const newSizeData = [
                                  ...(field?.value as {
                                    type: string;
                                    sheetId?: string | undefined;
                                    quantity?: number | undefined;
                                    Bundle?: string[] | undefined;
                                  }[]),
                                ];
                                newSizeData[index].quantity = parseInt(
                                  e.target.value
                                );
                                field.onChange(newSizeData);
                              }}
                            />
                          )} */}
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
          <FormSuccess message={success} />
          <FormError message={error} />
        </div>
      </form>
    </Form>
  );
}

export default SheetForm;
