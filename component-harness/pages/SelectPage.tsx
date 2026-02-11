import { Select } from '../components'

export default function SelectPage() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Select
        options={[
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
          { value: 'orange', label: 'Orange' },
        ]}
        placeholder="Select a fruit"
      />
      <Select
        searchable
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'solid', label: 'SolidJS' },
          { value: 'preact', label: 'Preact' },
        ]}
        placeholder="Search frameworks..."
      />
    </div>
  )
}
