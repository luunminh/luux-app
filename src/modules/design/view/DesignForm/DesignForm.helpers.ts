import { Yup } from '@core/common';

export interface IPage {
  page: number;
  content: Object;
}

export interface IDesignForm {
  name: string;
  category: string;
  access: string[] | 'public' | 'private';
  design: IPage[];
}

export enum IDesignFormKey {
  NAME = 'name',
  CATEGORY = 'category',
  ACCESS = 'access',
  DESIGN = 'design',
}

export const designFormInitialValues: IDesignForm = {
  name: '',
  category: 'poster',
  access: ['1', '2', '3', '4'],
  design: [
    {
      page: 1,
      content: {},
    },
  ],
};

export const designFormSchema = Yup.object().shape({
  [IDesignFormKey.NAME]: Yup.string().required(),
  [IDesignFormKey.CATEGORY]: Yup.string().required(),
  [IDesignFormKey.ACCESS]: Yup.string().required(),
  [IDesignFormKey.DESIGN]: Yup.array().of(
    Yup.object().shape({
      page: Yup.number().required(),
      content: Yup.object().required(),
    }),
  ),
});
