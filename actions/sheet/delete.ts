'use server';

import { db } from '@/lib/db';

export const deleteClothDesign = async (id: string) => {
  try {
    const cloth = await db.cloth.delete({
      where: { id },
    });
    if (cloth) {
      return { message: 'Cloth deleted successfully' };
    } else {
      return { error: 'No cloth Found' };
    }
  } catch (error) {
    console.log('Error deleting cloth object:', error);
    return { error: 'Error deleting cloth object', detailedError: error };
  }
};

export const deleteSheet = async (id: string) => {
  try {
    const sheet = await db.sheet.delete({
      where: { id },
    });

    return sheet;
  } catch (error) {
    console.log('Error deleting sheet object:', error);
    return { error: 'Error deleting sheet object', detailedError: error };
  }
};

export const deleteBundle = async (id: string) => {
  try {
    const bundle = await db.bundle.delete({
      where: { id },
    });

    return bundle;
  } catch (error) {
    console.log('Error deleting bundle object:', error);
    return { error: 'Error deleting bundle object', detailedError: error };
  }
};

export const deletePayment = async (id: string) => {
  try {
    const payment = await db.payment.delete({
      where: { id },
    });

    return payment;
  } catch (error) {
    console.log('Error deleting payment object:', error);
    return { error: 'Error deleting payment object', detailedError: error };
  }
};

export const deleteWorker = async (id: string) => {
  try {
    const worker = await db.worker.delete({
      where: { id },
    });

    return worker;
  } catch (error) {
    console.log('Error deleting worker object:', error);
    return { error: 'Error deleting worker object', detailedError: error };
  }
};
