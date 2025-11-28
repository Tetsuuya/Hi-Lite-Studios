import type { AboutUsStaff } from '@/supabase/supabase_services/Content_Management/AboutUs_Servicce/AboutUs'

type StaffListProps = {
  staff: AboutUsStaff[]
  onDelete: (id: string) => void
  disabled?: boolean
}

export default function StaffList({ staff, onDelete, disabled = false }: StaffListProps) {
  if (staff.length === 0) {
    return <p className="text-sm text-gray-500">No staff members yet.</p>
  }

  return (
    <ul className="space-y-2">
      {staff.map((member) => (
        <li
          key={member.id}
          className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2"
        >
          <span className="text-sm font-medium text-gray-900">{member.name}</span>
          <button
            type="button"
            onClick={() => onDelete(member.id)}
            className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={disabled}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}

