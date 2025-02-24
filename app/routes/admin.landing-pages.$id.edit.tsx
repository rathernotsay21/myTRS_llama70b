// app/routes/admin.landing-pages.$id.edit.tsx
import { json, redirect, type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "@remix-run/react";
import { useState } from "react";
import type { LandingPage, LandingPageFormField } from "~/models/landingPage";

// Mock data - in a real app, you'd fetch this from your database
const mockLandingPage: Partial<LandingPage> = {
  id: "1",
  organizationId: "org123",
  title: "Annual Fundraiser 2025",
  subtitle: "Join us for our biggest event of the year!",
  slug: "annual-fundraiser-2025",
  eventInfo: {
    date: "April 15, 2025",
    time: "5:00 PM - 9:00 PM",
    location: "City Convention Center",
    description: "Help us make this year's fundraiser a success by volunteering your time and talents. Whether you're greeting guests, helping with setup, or assisting with the auction, your support makes a difference!"
  },
  socialMedia: [
    { platform: "facebook", url: "https://facebook.com/organization" },
    { platform: "twitter", url: "https://twitter.com/organization" },
    { platform: "instagram", url: "https://instagram.com/organization" }
  ],
  formFields: [
    { id: "name", label: "Full Name", type: "text", required: true },
    { id: "email", label: "Email Address", type: "email", required: true },
    { id: "phone", label: "Phone Number", type: "tel", required: true },
    { 
      id: "availability", 
      label: "Availability", 
      type: "checkbox", 
      required: true,
      options: [
        { value: "setup", label: "Setup (2:00 PM - 5:00 PM)" },
        { value: "event", label: "During Event (5:00 PM - 9:00 PM)" },
        { value: "cleanup", label: "Cleanup (9:00 PM - 11:00 PM)" }
      ]
    },
    { 
      id: "skills", 
      label: "Skills & Interests", 
      type: "select",
      options: [
        { value: "greeting", label: "Guest Greeting" },
        { value: "registration", label: "Registration Desk" },
        { value: "auction", label: "Auction Assistant" },
        { value: "technical", label: "Technical Support" },
        { value: "photography", label: "Event Photography" }
      ]
    },
    { 
      id: "experience", 
      label: "Previous Volunteer Experience", 
      type: "textarea",
      placeholder: "Tell us about any previous volunteer experience you have."
    }
  ],
  theme: {
    primaryColor: "#3B82F6", // blue-500
    secondaryColor: "#1F2937", // gray-800
    accentColor: "#F59E0B", // amber-500
    fontFamily: "Inter, sans-serif",
    buttonStyle: "rounded"
  },
  primaryButtonText: "Volunteer Now",
  primaryButtonLink: "#volunteer-form",
  secondaryButtonText: "Learn More",
  secondaryButtonLink: "#event-info",
  logoUrl: "https://via.placeholder.com/150",
  backgroundImageUrl: "https://via.placeholder.com/1920x600",
  published: false,
  createdAt: new Date("2025-01-15"),
  updatedAt: new Date("2025-01-20")
};

type LoaderData = {
  landingPage: typeof mockLandingPage;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  
  // In a real app, fetch the landing page from your database using the id
  // If not found, you could return a 404 response
  
  return json({ landingPage: mockLandingPage });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  
  // In a real app, you'd process and validate all the form data
  // and update the landing page in your database
  
  // Extract form data and build updated landing page object
  
  // Here we're just simulating a successful update
  return redirect(`/admin/landing-pages`);
};

export default function EditLandingPage() {
  const { landingPage } = useLoaderData<LoaderData>();
  const params = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  // Tabs for organizing the editor
  const [activeTab, setActiveTab] = useState("general");
  
  // State for form fields (in a real app, you'd use a form library like react-hook-form)
  const [formFields, setFormFields] = useState<LandingPageFormField[]>(
    landingPage.formFields || []
  );
  
  // Handler for adding a new form field
  const addFormField = () => {
    const newId = `field_${Date.now()}`;
    setFormFields([
      ...formFields,
      { id: newId, label: "New Field", type: "text" }
    ]);
  };
  
  // Handler for removing a form field
  const removeFormField = (fieldId: string) => {
    setFormFields(formFields.filter(field => field.id !== fieldId));
  };
  
  // Handler for updating a form field
  const updateFormField = (fieldId: string, updates: Partial<LandingPageFormField>) => {
    setFormFields(
      formFields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      )
    );
  };
  
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
          Edit Landing Page: {landingPage.title}
        </h1>
        
        <div className="flex items-center space-x-4">
          <a
            href={`/admin/landing-pages/${params.id}/preview`}
            target="_blank"
            className="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Preview
          </a>
          
          {landingPage.published ? (
            <a
              href={`/e/${landingPage.slug}`}
              target="_blank"
              className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              View Live
            </a>
          ) : null}
        </div>
      </div>
      
      {/* Editor Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <Form method="post" className="space-y-8">
        {activeTab === "general" && (
          <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">General Information</h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Landing Page Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    defaultValue={landingPage.title}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subtitle
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="subtitle"
                    id="subtitle"
                    defaultValue={landingPage.subtitle}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  URL Slug
                </label>
                <div className="mt-1">
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
                      /e/
                    </span>
                    <input
                      type="text"
                      name="slug"
                      id="slug"
                      defaultValue={landingPage.slug}
                      required
                      className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Logo URL
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="logoUrl"
                    id="logoUrl"
                    defaultValue={landingPage.logoUrl}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="backgroundImageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Background Image URL
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="backgroundImageUrl"
                    id="backgroundImageUrl"
                    defaultValue={landingPage.backgroundImageUrl}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="primaryButtonText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Primary Button Text
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="primaryButtonText"
                    id="primaryButtonText"
                    defaultValue={landingPage.primaryButtonText}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="primaryButtonLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Primary Button Link
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="primaryButtonLink"
                    id="primaryButtonLink"
                    defaultValue={landingPage.primaryButtonLink}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="secondaryButtonText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Secondary Button Text
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="secondaryButtonText"
                    id="secondaryButtonText"
                    defaultValue={landingPage.secondaryButtonText}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="secondaryButtonLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Secondary Button Link
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="secondaryButtonLink"
                    id="secondaryButtonLink"
                    defaultValue={landingPage.secondaryButtonLink}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "event" && (
          <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Event Information</h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Event Date
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="eventDate"
                    id="eventDate"
                    defaultValue={landingPage.eventInfo?.date}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Event Time
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="eventTime"
                    id="eventTime"
                    defaultValue={landingPage.eventInfo?.time}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Event Location
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="eventLocation"
                    id="eventLocation"
                    defaultValue={landingPage.eventInfo?.location}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Description
              </label>
              <div className="mt-1">
                <textarea
                  name="eventDescription"
                  id="eventDescription"
                  rows={4}
                  defaultValue={landingPage.eventInfo?.description}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "form" && (
          <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Registration Form Fields</h2>
              
              <button
                type="button"
                onClick={addFormField}
                className="inline-flex items-center rounded-md border border-transparent bg-blue-100 px-3 py-2 text-sm font-medium leading-4 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
              >
                Add Field
              </button>
            </div>
            
            <div className="space-y-6">
              {formFields.map((field, index) => (
                <div 
                  key={field.id} 
                  className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-md font-medium text-gray-900 dark:text-white">
                      Field #{index + 1}
                    </h3>
                    
                    <button
                      type="button"
                      onClick={() => removeFormField(field.id)}
                      className="inline-flex items-center rounded-md border border-transparent bg-red-100 px-3 py-2 text-sm font-medium leading-4 text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label 
                        htmlFor={`form-field-${field.id}-label`} 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Field Label
                      </label>
                      <input
                        type="text"
                        id={`form-field-${field.id}-label`}
                        name={`formFields[${index}].label`}
                        value={field.label}
                        onChange={(e) => updateFormField(field.id, { label: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label 
                        htmlFor={`form-field-${field.id}-type`} 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Field Type
                      </label>
                      <select
                        id={`form-field-${field.id}-type`}
                        name={`formFields[${index}].type`}
                        value={field.type}
                        onChange={(e) => updateFormField(field.id, { 
                          type: e.target.value as any,
                          // Reset options if changing away from select/checkbox/radio
                          options: ['select', 'checkbox', 'radio'].includes(e.target.value) 
                            ? field.options 
                            : undefined
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="tel">Phone</option>
                        <option value="select">Dropdown</option>
                        <option value="textarea">Text Area</option>
                        <option value="checkbox">Checkboxes</option>
                        <option value="radio">Radio Buttons</option>
                        <option value="date">Date</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <input
                      type="checkbox"
                      id={`form-field-${field.id}-required`}
                      name={`formFields[${index}].required`}
                      checked={field.required}
                      onChange={(e) => updateFormField(field.id, { required: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                    />
                    <label 
                      htmlFor={`form-field-${field.id}-required`} 
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Required Field
                    </label>
                  </div>
                  
                  {field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'textarea' ? (
                    <div className="mt-4">
                      <label 
                        htmlFor={`form-field-${field.id}-placeholder`} 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Placeholder Text
                      </label>
                      <input
                        type="text"
                        id={`form-field-${field.id}-placeholder`}
                        name={`formFields[${index}].placeholder`}
                        value={field.placeholder || ''}
                        onChange={(e) => updateFormField(field.id, { placeholder: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  ) : null}
                  
                  {field.type === 'select' || field.type === 'checkbox' || field.type === 'radio' ? (
                    <div className="mt-4">
                      <label 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Options
                      </label>
                      <div className="mt-2 space-y-2">
                        {(field.options || []).map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={option.label}
                              onChange={(e) => {
                                const newOptions = [...(field.options || [])];
                                newOptions[optionIndex].label = e.target.value;
                                newOptions[optionIndex].value = e.target.value.toLowerCase().replace(/\s+/g, '_');
                                updateFormField(field.id, { options: newOptions });
                              }}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newOptions = [...(field.options || [])];
                                newOptions.splice(optionIndex, 1);
                                updateFormField(field.id, { options: newOptions });
                              }}
                              className="inline-flex items-center rounded-md border border-gray-300 bg-white p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                            >
                              X
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newOptions = [...(field.options || []), { value: '', label: '' }];
                            updateFormField(field.id, { options: newOptions });
                          }}
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          + Add Option
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === "social" && (
          <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Social Media Links</h2>
              
              <button
                type="button"
                onClick={() => {
                  // Add social media link logic here
                }}
                className="inline-flex items-center rounded-md border border-transparent bg-blue-100 px-3 py-2 text-sm font-medium leading-4 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
              >
                Add Link
              </button>
            </div>
            
            <div className="space-y-4">
              {(landingPage.socialMedia || []).map((social, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-1/4">
                    <select
                      name={`socialMedia[${index}].platform`}
                      defaultValue={social.platform}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="facebook">Facebook</option>
                      <option value="twitter">Twitter</option>
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="youtube">YouTube</option>
                      <option value="website">Website</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="flex-1">
                    <input
                      type="url"
                      name={`socialMedia[${index}].url`}
                      defaultValue={social.url}
                      placeholder="https://..."
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      // Remove social media link logic here
                    }}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === "theme" && (
          <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Theme Customization</h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Primary Color
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="color"
                    name="primaryColor"
                    id="primaryColor"
                    defaultValue={landingPage.theme?.primaryColor}
                    className="h-8 w-8 rounded-md border-gray-300 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="primaryColorHex"
                    defaultValue={landingPage.theme?.primaryColor}
                    className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Secondary Color
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="color"
                    name="secondaryColor"
                    id="secondaryColor"
                    defaultValue={landingPage.theme?.secondaryColor}
                    className="h-8 w-8 rounded-md border-gray-300 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="secondaryColorHex"
                    defaultValue={landingPage.theme?.secondaryColor}
                    className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Accent Color
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="color"
                    name="accentColor"
                    id="accentColor"
                    defaultValue={landingPage.theme?.accentColor}
                    className="h-8 w-8 rounded-md border-gray-300 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="accentColorHex"
                    defaultValue={landingPage.theme?.accentColor}
                    className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Font Family
              </label>
              <div className="mt-1">
                <select
                  name="fontFamily"
                  id="fontFamily"
                  defaultValue={landingPage.theme?.fontFamily}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Inter, sans-serif">Inter (Default)</option>
                  <option value="'Roboto', sans-serif">Roboto</option>
                  <option value="'Open Sans', sans-serif">Open Sans</option>
                  <option value="'Montserrat', sans-serif">Montserrat</option>
                  <option value="'Lato', sans-serif">Lato</option>
                  <option value="'Poppins', sans-serif">Poppins</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="buttonStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Button Style
              </label>
              <div className="mt-1">
                <select
                  name="buttonStyle"
                  id="buttonStyle"
                  defaultValue={landingPage.theme?.buttonStyle}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="rounded">Rounded</option>
                  <option value="square">Square</option>
                  <option value="pill">Pill</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "publish" && (
          <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Publishing Settings</h2>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="published"
                id="published"
                defaultChecked={landingPage.published}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Published (Publicly Visible)
              </label>
            </div>
            
            <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900">
              <div className="flex">
                <div className="flex-shrink-0">
                  ⚠️
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Important Notice</h3>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <p>
                      When published, this landing page will be publicly accessible to anyone with the link. 
                      Make sure all information is accurate before publishing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="text-md font-medium text-gray-900 dark:text-white">Landing Page URL</h3>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
                    https://yourdomain.com/e/
                  </span>
                  <input
                    type="text"
                    readOnly
                    value={landingPage.slug}
                    className="block w-full rounded-none rounded-r-md border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end space-x-4 pt-5">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </Form>
    </div>
  );
}

const tabs = [
  { id: "general", label: "General" },
  { id: "event", label: "Event Info" },
  { id: "form", label: "Registration Form" },
  { id: "social", label: "Social Media" },
  { id: "theme", label: "Theme" },
  { id: "publish", label: "Publish" },
];
