import { useEffect, useState } from 'react'
import MainDetailsForm from './components/MainDetailsForm'
import MeetTeamForm from './components/MeetTeamForm'
import WhatWeDoForm from './components/WhatWeDoForm'
import {
  addStaff,
  deleteStaff,
  fetchAboutUs,
  fetchStaff,
  updateAboutUs,
  uploadAboutUsImage,
  type AboutUs as AboutUsType,
  type AboutUsStaff,
} from '@/supabase/supabase_services/Content_Management/AboutUs_Servicce/AboutUs'

type MainFormState = {
  main_image_url: string
  description: string
}

type MeetTeamFormState = {
  title: string
  subtitle: string
}

type WhatWeDoFormState = {
  title: string
  description: string
}

const LoadingState = () => (
  <div className="space-y-4">
    <div className="h-6 w-40 rounded bg-gray-200 animate-pulse" />
    <div className="h-96 w-full rounded-2xl bg-gray-100 animate-pulse" />
  </div>
)

export default function AboutUsTab() {
  const [aboutUs, setAboutUs] = useState<AboutUsType | null>(null)
  const [staff, setStaff] = useState<AboutUsStaff[]>([])
  const [mainForm, setMainForm] = useState<MainFormState>({ main_image_url: '', description: '' })
  const [meetTeamForm, setMeetTeamForm] = useState<MeetTeamFormState>({ title: '', subtitle: '' })
  const [whatWeDoForm, setWhatWeDoForm] = useState<WhatWeDoFormState>({
    title: '',
    description: '',
  })
  const [editingStates, setEditingStates] = useState({
    main: false,
    meetTeam: false,
    whatWeDo: false,
  })
  const [newStaffName, setNewStaffName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savingMain, setSavingMain] = useState(false)
  const [savingTeam, setSavingTeam] = useState(false)
  const [savingWhat, setSavingWhat] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [addingStaff, setAddingStaff] = useState(false)

  useEffect(() => {
    void loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [aboutData, staffData] = await Promise.all([fetchAboutUs(), fetchStaff()])
      setAboutUs(aboutData)
      setStaff(staffData)
      setMainForm({
        main_image_url: aboutData.main_image_url || '',
        description: aboutData.description || '',
      })
      setMeetTeamForm({
        title: aboutData.meet_team_title || '',
        subtitle: aboutData.meet_team_subtitle || '',
      })
      setWhatWeDoForm({
        title: aboutData.what_we_do_title || '',
        description: aboutData.what_we_do_description || '',
      })
      setEditingStates({ main: false, meetTeam: false, whatWeDo: false })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load About Us data.')
    } finally {
      setLoading(false)
    }
  }

  const handleMainSubmit = async () => {
    setSavingMain(true)
    setError(null)
    try {
      const updated = await updateAboutUs({
        main_image_url: mainForm.main_image_url || null,
        description: mainForm.description || null,
      })
      setAboutUs(updated)
      setEditingStates((prev) => ({ ...prev, main: false }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save main section.')
    } finally {
      setSavingMain(false)
    }
  }

  const handleMeetTeamSubmit = async () => {
    setSavingTeam(true)
    setError(null)
    try {
      const updated = await updateAboutUs({
        meet_team_title: meetTeamForm.title || null,
        meet_team_subtitle: meetTeamForm.subtitle || null,
      })
      setAboutUs(updated)
      setEditingStates((prev) => ({ ...prev, meetTeam: false }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save meet the team section.')
    } finally {
      setSavingTeam(false)
    }
  }

  const handleWhatWeDoSubmit = async () => {
    setSavingWhat(true)
    setError(null)
    try {
      const updated = await updateAboutUs({
        what_we_do_title: whatWeDoForm.title || null,
        what_we_do_description: whatWeDoForm.description || null,
      })
      setAboutUs(updated)
      setEditingStates((prev) => ({ ...prev, whatWeDo: false }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save what we do section.')
    } finally {
      setSavingWhat(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true)
    setError(null)
    try {
      const { publicUrl } = await uploadAboutUsImage(file)
      setMainForm((prev) => ({ ...prev, main_image_url: publicUrl }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image.')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleAddStaff = async () => {
    if (!newStaffName.trim()) return
    setAddingStaff(true)
    setError(null)
    try {
      const created = await addStaff({ name: newStaffName.trim() })
      setStaff((prev) => [...prev, created])
      setNewStaffName('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add staff.')
    } finally {
      setAddingStaff(false)
    }
  }

  const handleDeleteStaff = async (id: string) => {
    try {
      await deleteStaff(id)
      setStaff((prev) => prev.filter((member) => member.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete staff.')
    }
  }

  const resetMainForm = () => {
    if (!aboutUs) return
    setMainForm({
      main_image_url: aboutUs.main_image_url || '',
      description: aboutUs.description || '',
    })
  }

  const resetMeetTeamForm = () => {
    if (!aboutUs) return
    setMeetTeamForm({
      title: aboutUs.meet_team_title || '',
      subtitle: aboutUs.meet_team_subtitle || '',
    })
  }

  const resetWhatWeDoForm = () => {
    if (!aboutUs) return
    setWhatWeDoForm({
      title: aboutUs.what_we_do_title || '',
      description: aboutUs.what_we_do_description || '',
    })
  }

  if (loading) {
    return <LoadingState />
  }

  return (
    <section className="space-y-10">
      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <MainDetailsForm
        values={mainForm}
        onChange={(changes) => setMainForm((prev) => ({ ...prev, ...changes }))}
        onSubmit={handleMainSubmit}
        onImageUpload={handleImageUpload}
        submitting={savingMain}
        uploadingImage={uploadingImage}
        editing={editingStates.main}
        onEditToggle={() => setEditingStates((prev) => ({ ...prev, main: true }))}
        onCancel={() => {
          resetMainForm()
          setEditingStates((prev) => ({ ...prev, main: false }))
        }}
      />

      <hr className="border-gray-200" />

      <MeetTeamForm
        values={meetTeamForm}
        newStaffName={newStaffName}
        submitting={savingTeam}
        addingStaff={addingStaff}
        staff={staff}
        onChange={(changes) => setMeetTeamForm((prev) => ({ ...prev, ...changes }))}
        onSubmit={handleMeetTeamSubmit}
        onAddStaff={handleAddStaff}
        onNewStaffNameChange={setNewStaffName}
        onDeleteStaff={handleDeleteStaff}
        editing={editingStates.meetTeam}
        onEditToggle={() => setEditingStates((prev) => ({ ...prev, meetTeam: true }))}
        onCancel={() => {
          resetMeetTeamForm()
          setEditingStates((prev) => ({ ...prev, meetTeam: false }))
        }}
      />

      <hr className="border-gray-200" />

      <WhatWeDoForm
        values={whatWeDoForm}
        submitting={savingWhat}
        onChange={(changes) => setWhatWeDoForm((prev) => ({ ...prev, ...changes }))}
        onSubmit={handleWhatWeDoSubmit}
        editing={editingStates.whatWeDo}
        onEditToggle={() => setEditingStates((prev) => ({ ...prev, whatWeDo: true }))}
        onCancel={() => {
          resetWhatWeDoForm()
          setEditingStates((prev) => ({ ...prev, whatWeDo: false }))
        }}
      />
    </section>
  )
}

