<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

type CombinationMode = 'and' | 'or'

const { t } = useI18n()

const cvFilterKeys = ['capability', 'technology', 'certificate', 'course'] as const

type CvFilterKey = (typeof cvFilterKeys)[number]

type FilterForm = {
  name: string
  cv: string
  email: string
  login: string
  branch: string
  id1c: string
  practice: string
  capabilities: string
  technology: string
  certificates: string
  courses: string
  userType: string
  contractType: string
  education: string
  specialization: string
  cvFilters: CvFilterKey[]
  capabilityMode: CombinationMode
  technologyMode: CombinationMode
  certificatesMode: CombinationMode
  coursesMode: CombinationMode
  toggles: {
    userDetails: boolean
    contactInfo: boolean
    currentAssignments: boolean
    includeTerminated: boolean
  }
}

const createDefaultForm = (): FilterForm => ({
  name: 'Andrew Salgado',
  cv: '',
  email: 'example@mail.com',
  login: 'Login',
  branch: '',
  id1c: 'Id',
  practice: '',
  capabilities: '',
  technology: '',
  certificates: '',
  courses: '',
  userType: 'Any',
  contractType: 'Any',
  education: '',
  specialization: '',
  cvFilters: [...cvFilterKeys],
  capabilityMode: 'and',
  technologyMode: 'and',
  certificatesMode: 'and',
  coursesMode: 'and',
  toggles: {
    userDetails: true,
    contactInfo: false,
    currentAssignments: false,
    includeTerminated: false
  }
})

const form = reactive(createDefaultForm())

const branchOptions = ['Paris HQ', 'London', 'Remote']
const practiceOptions = ['Consulting', 'Design', 'Engineering']
const userTypeOptions = ['Any', 'Full-time', 'Contractor']
const contractTypeOptions = ['Any', 'Permanent', 'Fixed-term']
const educationOptions = ['Bachelor', 'Master', 'PhD']

const handleClear = () => {
  Object.assign(form, createDefaultForm())
}

const handleSearch = () => {
  // Placeholder for future integration with backend filtering logic.
  console.debug('[People] search payload', JSON.parse(JSON.stringify(form)))
}
</script>

<template>
  <div class="flex flex-col gap-6 text-[#4F4F4F]">
    <div class="flex flex-wrap gap-4">
      <button
        type="button"
        class="flex min-w-[220px] flex-1 basis-0 items-center gap-4 rounded-[14px] border border-[#2F80ED]/30 bg-[#2F80ED] px-8 py-6 text-left text-white shadow-[0_6px_14px_rgba(47,128,237,0.2)] transition hover:bg-[#2065c8]"
      >
        <i class="i-carbon-search text-4xl" aria-hidden="true" />
        <span class="text-[20px] font-medium leading-[24px] tracking-[0.14px]">
          {{ t('people.cards.findPerson') }}
        </span>
      </button>

      <button
        type="button"
        class="flex min-w-[220px] flex-1 basis-0 items-center gap-4 rounded-[14px] border border-[#E2E7F2] bg-white px-8 py-6 text-left text-[#1F2937] shadow-[0_2px_8px_rgba(46,50,66,0.08)] transition hover:shadow-[0_8px_20px_rgba(46,50,66,0.12)]"
      >
        <i class="i-carbon-user-multiple text-4xl text-[#2F80ED]" aria-hidden="true" />
        <span class="text-[20px] font-medium leading-[24px] tracking-[0.14px]">
          {{ t('people.cards.allPeople') }}
        </span>
      </button>
    </div>

    <section class="card-base flex flex-col gap-8 p-8">
      <header>
        <h1 class="text-[20px] font-medium leading-[30px] tracking-[0.2px] text-[#000000]">
          {{ t('people.title') }}
        </h1>
      </header>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="flex flex-col gap-2">
          <label class="text-[12px] leading-[14px] tracking-[0.12px] text-black">
            {{ t('people.labels.name') }}
          </label>
          <input
            v-model="form.name"
            type="text"
            class="h-9 w-full rounded-md border border-transparent bg-[#F1F1F1] px-3 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED])"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[12px] leading-[14px] tracking-[0.12px] text-black">
            {{ t('people.labels.cv') }}
          </label>
          <input
            v-model="form.cv"
            type="text"
            :placeholder="t('people.placeholders.search')"
            class="h-9 w-full rounded-md border border-transparent bg-[#F1F1F1] px-3 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED]) placeholder:text-[#8E8E93]"
          />
          <div class="flex flex-wrap gap-4 pt-1 text-[12px]">
            <label
              v-for="key in cvFilterKeys"
              :key="key"
              class="flex items-center gap-2 uppercase tracking-[0.12px] text-[#4F4F4F]"
            >
              <input
                v-model="form.cvFilters"
                type="checkbox"
                :value="key"
                class="size-4 accent-[#2F80ED]"
              />
              <span>{{ t(`people.cvFilters.${key}`) }}</span>
            </label>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[12px] leading-[14px] tracking-[0.12px] text-black">
            {{ t('people.labels.email') }}
          </label>
          <input
            v-model="form.email"
            type="email"
            class="h-9 w-full rounded-md border border-transparent bg-[#F1F1F1] px-3 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED])"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[12px] leading-[14px] tracking-[0.12px] text-black">
            {{ t('people.labels.capabilities') }}
          </label>
          <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <input
              v-model="form.capabilities"
              type="text"
              :placeholder="t('people.placeholders.search')"
              class="h-9 w-full rounded-md border border-transparent bg-[#F1F1F1] px-3 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED]) placeholder:text-[#8E8E93] md:flex-1"
            />
            <div class="flex items-center gap-4 text-[12px] uppercase tracking-[0.12px] text-[#4F4F4F]">
              <label class="flex items-center gap-2">
                <input v-model="form.capabilityMode" type="radio" value="and" class="size-4 accent-[#2F80ED]" />
                <span>{{ t('people.combination.and') }}</span>
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.capabilityMode" type="radio" value="or" class="size-4 accent-[#2F80ED]" />
                <span>{{ t('people.combination.or') }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[12px] leading-[14px] tracking-[0.12px] text-black">
            {{ t('people.labels.login') }}
          </label>
          <input
            v-model="form.login"
            type="text"
            class="h-9 w-full rounded-md border border-transparent bg-[#F1F1F1] px-3 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED])"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[12px] leading-[14px] tracking-[0.12px] text-black">
            {{ t('people.labels.branch') }}
          </label>
          <div class="relative">
            <select
              v-model="form.branch"
              class="h-9 w-full appearance-none rounded-md border border-transparent bg-[#F1F1F1] px-3 pr-10 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED])"
            >
              <option value="">{{ t('people.placeholders.select') }}</option>
              <option v-for="option in branchOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <i class="i-carbon-caret-down pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93]" aria-hidden="true" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[12px] leading-[14px] tracking-[0.12px] text-black">
            {{ t('people.labels.technology') }}
          </label>
          <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <input
              v-model="form.technology"
              type="text"
              :placeholder="t('people.placeholders.search')"
              class="h-9 w-full rounded-md border border-transparent bg-[#F1F1F1] px-3 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED]) placeholder:text-[#8E8E93] md:flex-1"
            />
            <div class="flex items-center gap-4 text-[12px] uppercase tracking-[0.12px] text-[#4F4F4F]">
              <label class="flex items-center gap-2">
                <input v-model="form.technologyMode" type="radio" value="and" class="size-4 accent-[#2F80ED]" />
                <span>{{ t('people.combination.and') }}</span>
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.technologyMode" type="radio" value="or" class="size-4 accent-[#2F80ED]" />
                <span>{{ t('people.combination.or') }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[12px] leading-[14px] tracking-[0.12px] text-black">
            {{ t('people.labels.id1c') }}
          </label>
          <input
            v-model="form.id1c"
            type="text"
            class="h-9 w-full rounded-md border border-transparent bg-[#F1F1F1] px-3 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED])"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[12px] leading-[14px] tracking-[0.12px] text-black">
            {{ t('people.labels.practice') }}
          </label>
          <div class="relative">
            <select
              v-model="form.practice"
              class="h-9 w-full appearance-none rounded-md border border-transparent bg-[#F1F1F1] px-3 pr-10 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED])"
            >
              <option value="">{{ t('people.placeholders.select') }}</option>
              <option v-for="option in practiceOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <i class="i-carbon-caret-down pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93]" aria-hidden="true" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[12px] leading-[14px] tracking-[0.12px] text-black">
            {{ t('people.labels.certificates') }}
          </label>
          <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <input
              v-model="form.certificates"
              type="text"
              :placeholder="t('people.placeholders.search')"
              class="h-9 w-full rounded-md border border-transparent bg-[#F1F1F1] px-3 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED]) placeholder:text-[#8E8E93] md:flex-1"
            />
            <div class="flex items-center gap-4 text-[12px] uppercase tracking-[0.12px] text-[#4F4F4F]">
              <label class="flex items-center gap-2">
                <input v-model="form.certificatesMode" type="radio" value="and" class="size-4 accent-[#2F80ED]" />
                <span>{{ t('people.combination.and') }}</span>
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.certificatesMode" type="radio" value="or" class="size-4 accent-[#2F80ED]" />
                <span>{{ t('people.combination.or') }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[12px] leading-[14px] tracking-[0.12px] text-black">
            {{ t('people.labels.userType') }}
          </label>
          <div class="relative">
            <select
              v-model="form.userType"
              class="h-9 w-full appearance-none rounded-md border border-transparent bg-[#F1F1F1] px-3 pr-10 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED])"
            >
              <option v-for="option in userTypeOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <i class="i-carbon-caret-down pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93]" aria-hidden="true" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[12px] leading-[14px] tracking-[0.12px] text-black">
            {{ t('people.labels.courses') }}
          </label>
          <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <input
              v-model="form.courses"
              type="text"
              :placeholder="t('people.placeholders.search')"
              class="h-9 w-full rounded-md border border-transparent bg-[#F1F1F1] px-3 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED]) placeholder:text-[#8E8E93] md:flex-1"
            />
            <div class="flex items-center gap-4 text-[12px] uppercase tracking-[0.12px] text-[#4F4F4F]">
              <label class="flex items-center gap-2">
                <input v-model="form.coursesMode" type="radio" value="and" class="size-4 accent-[#2F80ED]" />
                <span>{{ t('people.combination.and') }}</span>
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.coursesMode" type="radio" value="or" class="size-4 accent-[#2F80ED]" />
                <span>{{ t('people.combination.or') }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[12px] leading-[14px] tracking-[0.12px] text-black">
            {{ t('people.labels.contractType') }}
          </label>
          <div class="relative">
            <select
              v-model="form.contractType"
              class="h-9 w-full appearance-none rounded-md border border-transparent bg-[#F1F1F1] px-3 pr-10 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED])"
            >
              <option v-for="option in contractTypeOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <i class="i-carbon-caret-down pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93]" aria-hidden="true" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[12px] leading-[14px] tracking-[0.12px] text-black">
            {{ t('people.labels.education') }}
          </label>
          <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <div class="relative w-full md:w-[184px]">
              <select
                v-model="form.education"
                class="h-9 w-full appearance-none rounded-md border border-transparent bg-[#F1F1F1] px-3 pr-10 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED])"
              >
                <option value="">{{ t('people.placeholders.select') }}</option>
                <option v-for="option in educationOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <i class="i-carbon-caret-down pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93]" aria-hidden="true" />
            </div>
            <input
              v-model="form.specialization"
              type="text"
              :placeholder="t('people.placeholders.specialization')"
              class="h-9 w-full rounded-md border border-transparent bg-[#F1F1F1] px-3 text-[14px] text-[#4F4F4F] outline-none transition focus:(bg-white ring-2 ring-[#2F80ED]) placeholder:text-[#8E8E93]"
            />
          </div>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <label class="flex items-center gap-3 text-[12px] leading-[14px] text-[#4F4F4F]">
          <input v-model="form.toggles.userDetails" type="checkbox" class="size-4 accent-[#2F80ED]" />
          <span>{{ t('people.toggles.userDetails') }}</span>
        </label>
        <label class="flex items-center gap-3 text-[12px] leading-[14px] text-[#4F4F4F]">
          <input v-model="form.toggles.contactInfo" type="checkbox" class="size-4 accent-[#2F80ED]" />
          <span>{{ t('people.toggles.contactInfo') }}</span>
        </label>
        <label class="flex items-center gap-3 text-[12px] leading-[14px] text-[#4F4F4F]">
          <input v-model="form.toggles.currentAssignments" type="checkbox" class="size-4 accent-[#2F80ED]" />
          <span>{{ t('people.toggles.currentAssignments') }}</span>
        </label>
        <label class="flex items-center gap-3 text-[12px] leading-[14px] text-[#4F4F4F]">
          <input v-model="form.toggles.includeTerminated" type="checkbox" class="size-4 accent-[#2F80ED]" />
          <span>{{ t('people.toggles.includeTerminated') }}</span>
        </label>
      </div>

      <footer class="flex flex-wrap items-center justify-end gap-3 border-t border-[#E2E7F2] pt-6">
        <button
          type="button"
          class="h-9 rounded-full border border-[#E2E7F2] px-6 text-[14px] text-[#4F4F4F] transition hover:bg-[#F1F1F1]"
          @click="handleClear"
        >
          {{ t('people.buttons.clear') }}
        </button>
        <button
          type="button"
          class="h-9 rounded-full bg-[#27AE60] px-8 text-[14px] font-medium text-white shadow-[0_6px_16px_rgba(39,174,96,0.3)] transition hover:bg-[#219653]"
          @click="handleSearch"
        >
          {{ t('people.buttons.search') }}
        </button>
      </footer>
    </section>
  </div>
</template>
