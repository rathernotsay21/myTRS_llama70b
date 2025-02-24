interface EventDetail {
  icon: ReactNode;
  label: string;
  value: string;
}

interface EventInfoSectionProps {
  title?: string;
  description?: string;
  details: EventDetail[];
}

export function EventInfoSection({
  title = "Event Information",
  description,
  details
}: EventInfoSectionProps) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      
      {description && (
        <p className="mt-3 text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
          {description}
        </p>
      )}
      
      <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {details.map((detail, index) => (
          <div 
            key={index} 
            className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800"
          >
            <dt className="flex justify-center text-gray-500 dark:text-gray-400">
              <span className="mr-2">{detail.icon}</span>
              <span>{detail.label}</span>
            </dt>
            <dd className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
