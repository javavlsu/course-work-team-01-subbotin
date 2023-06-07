import BaseForm, { FormField } from "./Form"

type BaseFormType = typeof BaseForm

interface FormComponent extends BaseFormType {
  FormField: typeof FormField
}

const Form = BaseForm as FormComponent

Form.FormField = FormField

export default Form
