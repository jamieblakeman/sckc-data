<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div class="min-h-full">
    <div class="bg-gray-800 pb-32">
      <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="border-b border-gray-700">
            <div class="flex h-16 items-center justify-between px-4 sm:px-0">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img
                    class="h-8 w-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div class="hidden md:block">
                  <div class="ml-10 flex items-baseline space-x-4">
                    <a
                      v-for="item in navigation"
                      :key="item.name"
                      :href="item.href"
                      :class="[
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      ]"
                      :aria-current="item.current ? 'page' : undefined"
                      >{{ item.name }}</a
                    >
                  </div>
                </div>
              </div>
              <div class="hidden md:block">
                <div class="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span class="sr-only">View notifications</span>
                    <BellIcon class="h-6 w-6" aria-hidden="true" />
                  </button>

                  <!-- Profile dropdown -->
                  <Menu as="div" class="relative ml-3">
                    <div>
                      <MenuButton
                        class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span class="sr-only">Open user menu</span>
                        <img
                          class="h-8 w-8 rounded-full"
                          :src="user.imageUrl"
                          alt=""
                        />
                      </MenuButton>
                    </div>
                    <transition
                      enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95"
                      enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100"
                      leave-to-class="transform opacity-0 scale-95"
                    >
                      <MenuItems
                        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <MenuItem
                          v-for="item in userNavigation"
                          :key="item.name"
                          v-slot="{ active }"
                        >
                          <a
                            :href="item.href"
                            :class="[
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            ]"
                            >{{ item.name }}</a
                          >
                        </MenuItem>
                      </MenuItems>
                    </transition>
                  </Menu>
                </div>
              </div>
              <div class="-mr-2 flex md:hidden">
                <!-- Mobile menu button -->
                <DisclosureButton
                  class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span class="sr-only">Open main menu</span>
                  <Bars3Icon
                    v-if="!open"
                    class="block h-6 w-6"
                    aria-hidden="true"
                  />
                  <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                </DisclosureButton>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel class="border-b border-gray-700 md:hidden">
          <div class="space-y-1 px-2 py-3 sm:px-3">
            <DisclosureButton
              v-for="item in navigation"
              :key="item.name"
              as="a"
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              ]"
              :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</DisclosureButton
            >
          </div>
          <div class="border-t border-gray-700 pb-3 pt-4">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <img
                  class="h-10 w-10 rounded-full"
                  :src="user.imageUrl"
                  alt=""
                />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium leading-none text-white">
                  {{ user.name }}
                </div>
                <div class="text-sm font-medium leading-none text-gray-400">
                  {{ user.email }}
                </div>
              </div>
              <button
                type="button"
                class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div class="mt-3 space-y-1 px-2">
              <DisclosureButton
                v-for="item in userNavigation"
                :key="item.name"
                as="a"
                :href="item.href"
                class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >{{ item.name }}</DisclosureButton
              >
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <header class="py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-white">
            SCKC Data Logger - SCKC {{ teamStore.matchStats.scScore }} - {{ teamStore.matchStats.oppScore }} Opposition
          </h1>
        </div>
      </header>
    </div>

    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="">
          <!-- <p class="test">Test</p> -->
          <VueYtframe
            ref="yt"
            video-id="2A5lfgIC9Gw"
            :height="height"
            :width="width"
            :playerVars="playerVars"
          />
        </div>
      </div>
      <div class="w-1/2 pl-2">
        <!-- .sort((a, b) => b.goals - a.goals) -->
        <transition-group name="flip-list" tag="div" class="row horizontal-scroll">
        <div
          v-for="player in teamStore.teamStats.slice().sort((a, b) => b.goals - a.goals)"
          :key="player.name"
          class="font-semibold pb-2"
        >
          {{ player.name }} 
          <Chip class="" :pt="{root: {class: 'pl-0 text-slate-700'}}" >
              <span class="bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center">{{ player.shots }} </span>
              <span class="ml-2 font-medium">Shot{{
            player.shots == 1 ? "" : "s"
          }}</span>
          </Chip>
          <Chip class="ml-1 pl-0 pr-4" :pt="{root: {class: 'p-0'}}">
              <span class="bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center">{{ player.goals }}</span>
              <span class="ml-2 font-medium">Goal{{
            player.goal == 1 ? "" : "s"
          }}</span>
          </Chip>
          <ProgressBar
          class="mt-1"
            :value="player.shootingPercentage"
            :key="player.name"
            :pt="{
        value: { style: { background: 'linear-gradient(to right, #880808, #EE4B2B)' } }
            }"
          />
        </div>
        </transition-group>
      </div>
      <div class="card">
        <PickList v-model="teamStore.teamPick" listStyle="height:342px" dataKey="item.name">
            <template #sourceheader> Available </template>
            <template #targetheader> Selected </template>
            <template #item="slotProps">
                <div class="flex flex-wrap p-2 align-items-center gap-3">
                    <!-- <img class="w-4rem shadow-2 flex-shrink-0 border-round" :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.item.image" :alt="slotProps.item.name" /> -->
                    <div class="flex-1 flex flex-column gap-2">
                        <span class="font-bold">{{ slotProps.item.name }}</span>
                        <!-- <div class="flex align-items-center gap-2">
                            <i class="pi pi-tag text-sm"></i>
                            <span>{{ slotProps.item.name }}</span>
                        </div> -->
                    </div>
                    <!-- <span class="font-bold text-900">$ {{ slotProps.item.name }}</span> -->
                </div>
            </template>
        </PickList>
        {{ teamStore.teamPick }}
    </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { useTeamStore } from "./stores/useTeamStore.js";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const teamStore = useTeamStore();
// import ProgressBar from "primevue/progressbar";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
import VueYtframe from "./YT.vue";
const height = ref(450);
const width = ref(800);
const playerVars = ref({
  autoplay: null,
  cc_lang_pref: null,
  cc_load_policy: null,
  color: null,
  controls: null,
  disablekb: null,
  enablejsapi: null,
  end: null,
  fs: null,
  hl: null,
  iv_load_policy: null,
  listType: null,
  loop: null,
  modestbranding: null,
  origin: window.location.origin,
  // playlist: playlist.value,
  playsinline: null,
  rel: 0,
  start: null,
});

// const lookForPause = computed(() => {
//   const playerElement = document.getElementsByClassName(
//     "ytp-pause-overlay ytp-scroll-min"
//   );
//   playerElement[0].style.display = "none";
//   console.log("test");
// });
// document.getElementsByClassName("ytp-pause-overlay ytp-scroll-min")[0].style.display = 'none';
</script>

<style lang='css' scoped>
:deep(.ytp-pause-overlay-container) {
  display: hidden !important;
}

.ytp-pause-overlay {
  display: none;
}

.test {
  opacity: 0.5;
}

:deep(.vs__dropdown-toggle) {
  background: white;
}

:deep(.ytp-pause-overlay) {
  opacity: 0 !important;
  display: none !important;
  color: red;
}
</style>