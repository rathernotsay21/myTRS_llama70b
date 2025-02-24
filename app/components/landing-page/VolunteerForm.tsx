interface FormField {
    id: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'date';
    required?: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
    description?: string;
  }
  
  interface VolunteerFormProps {
    title?: string;
    description?: string;
    fields: FormField[];
    submitButtonText?: string;
    onSubmit: (data: any) => void;
    formId?: string;
  }
  
  export function VolunteerForm({
    title = "Volunteer Registration",
    description,
    fields,
    submitButtonText = "Submit Registration",
    onSubmit,
    formId = "volunteer-form"
  }: VolunteerFormProps) {
    return (
      <div className="mx-auto max-w-3xl" id={formId}>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
          
          {description && (
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData.entries());
          onSubmit(data);
        }}>
          <div className="space-y-6">
            {fields.map((field) => (
              <div key={field.id}>
                <label 
                  htmlFor={field.id} 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {field.label}
                  {field.required && <span className="ml-1 text-red-500">*</span>}
                </label>
                
                {field.description && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {field.description}
                  </p>
                )}
                
                <div className="mt-1">
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      name={field.id}
                      required={field.required}
                      placeholder={field.placeholder}
                      rows={4}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      id={field.id}
                      name={field.id}
                      required={field.required}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">{field.placeholder || 'Select an option'}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'checkbox' ? (
                    <div className="mt-2 space-y-2">
                      {field.options?.map((option) => (
                        <div key={option.value} className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id={`${field.id}-${option.value}`}
                              name={field.id}
                              type="checkbox"
                              value={option.value}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label 
                              htmlFor={`${field.id}-${option.value}`} 
                              className="text-gray-700 dark:text-gray-300"
                            >
                              {option.label}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : field.type === 'radio' ? (
                    <div className="mt-2 space-y-2">
                      {field.options?.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`${field.id}-${option.value}`}
                            name={field.id}
                            type="radio"
                            value={option.value}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                          />
                          <label 
                            htmlFor={`${field.id}-${option.value}`} 
                            className="ml-3 block text-sm text-gray-700 dark:text-gray-300"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {submitButtonText}
            </button>
          </div>
        </form>
      </div>
    );
  }
  