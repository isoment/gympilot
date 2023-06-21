<template>
  <div class="bg-white">
    <header>
      <Popover class="relative bg-white">
        <div
          class="flex items-center justify-between px-4 py-3 mx-auto md:py-5 max-w-7xl sm:px-6 md:justify-start md:space-x-10 lg:px-8"
        >
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span class="sr-only">Logo</span>
              <img
                class="w-auto h-9 sm:h-11"
                src="../assets/dumbbell.png"
                alt="logo"
              />
            </a>
          </div>
          <div class="-my-2 -mr-2 md:hidden">
            <PopoverButton
              class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
            >
              <span class="sr-only">Open menu</span>
              <font-awesome-icon
                :icon="['fa', 'bars']"
                class="z-10 text-2xl text-gray-900 fill-current"
                aria-hidden="true"
              >
              </font-awesome-icon>
            </PopoverButton>
          </div>
          <PopoverGroup as="nav" class="hidden space-x-10 md:flex">
            <Popover v-slot="{ open }" class="relative">
              <PopoverButton
                :class="[
                  open ? 'text-gray-900' : 'text-gray-500',
                  'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500',
                ]"
              >
                <span>Solutions</span>
                <font-awesome-icon
                  :icon="['fa', 'chevron-down']"
                  :class="[
                    open ? 'text-gray-600' : 'text-gray-400',
                    'ml-2 h-4 w-4 group-hover:text-gray-500',
                  ]"
                  aria-hidden="true"
                >
                </font-awesome-icon>
              </PopoverButton>

              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="translate-y-1 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-1 opacity-0"
              >
                <PopoverPanel
                  class="absolute z-10 w-screen max-w-md mt-3 -ml-4 transform lg:max-w-2xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                >
                  <div
                    class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    <div
                      class="relative grid gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8 lg:grid-cols-2"
                    >
                      <a
                        v-for="item in solutions"
                        :key="item.name"
                        :href="item.href"
                        class="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50"
                      >
                        <div
                          class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-md bg-gradient-to-r from-emerald-300 to-green-500 sm:h-12 sm:w-12"
                        >
                          <font-awesome-icon
                            :icon="item.icon"
                            class="w-6 h-6 text-white"
                            aria-hidden="true"
                          >
                          </font-awesome-icon>
                        </div>
                        <div class="ml-4">
                          <p class="text-base font-medium text-gray-900">
                            {{ item.name }}
                          </p>
                          <p class="mt-1 text-sm text-gray-500">
                            {{ item.description }}
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>

            <a
              href="#"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Pricing
            </a>
            <a
              href="#"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Partners
            </a>
            <a
              href="#"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Company
            </a>
          </PopoverGroup>
          <div class="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
            <a
              href="#"
              class="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900"
            >
              Sign in
            </a>
            <a
              href="#"
              class="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white border border-transparent rounded-md shadow-sm whitespace-nowrap bg-gradient-to-r from-emerald-300 to-green-500 bg-origin-border hover:from-green-500 hover:to-green-500"
            >
              Sign up
            </a>
          </div>
        </div>

        <transition
          enter-active-class="duration-200 ease-out"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="duration-100 ease-in"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <PopoverPanel
            focus
            class="absolute inset-x-0 top-0 z-30 p-2 transition origin-top-right transform md:hidden"
          >
            <div
              class="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50"
            >
              <div class="px-5 pt-5 pb-6">
                <div class="flex items-center justify-between">
                  <div>
                    <img
                      class="w-auto h-9 sm:h-11"
                      src="../assets/dumbbell.png"
                      alt="logo"
                    />
                  </div>
                  <div class="-mr-2">
                    <PopoverButton
                      class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
                    >
                      <span class="sr-only">Close menu</span>
                      <font-awesome-icon
                        :icon="['fa', 'xmark']"
                        class="z-10 text-2xl text-gray-900 fill-current"
                        aria-hidden="true"
                      >
                      </font-awesome-icon>
                    </PopoverButton>
                  </div>
                </div>
                <div class="mt-6">
                  <nav class="grid grid-cols-1 gap-7">
                    <a
                      v-for="item in solutions"
                      :key="item.name"
                      :href="item.href"
                      class="flex items-center p-3 -m-3 rounded-lg hover:bg-gray-50"
                    >
                      <div
                        class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-md bg-gradient-to-r from-emerald-300 to-green-500"
                      >
                        <font-awesome-icon
                          :icon="item.icon"
                          class="w-6 h-6 text-white"
                          aria-hidden="true"
                        >
                        </font-awesome-icon>
                      </div>
                      <div class="ml-4 text-base font-medium text-gray-900">
                        {{ item.name }}
                      </div>
                    </a>
                  </nav>
                </div>
              </div>
              <div class="px-5 py-6">
                <div class="grid grid-cols-2 gap-4">
                  <a
                    href="#"
                    class="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Pricing
                  </a>
                  <a
                    href="#"
                    class="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Partners
                  </a>
                  <a
                    href="#"
                    class="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Company
                  </a>
                </div>
                <div class="mt-6">
                  <a
                    href="#"
                    class="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-emerald-300 to-green-500 bg-origin-border hover:from-green-500 hover:to-green-500"
                  >
                    Sign up
                  </a>
                  <p
                    class="mt-6 text-base font-medium text-center text-gray-500"
                  >
                    Existing customer?
                    <a href="#" class="text-gray-900"> Sign in </a>
                  </p>
                </div>
              </div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
    </header>

    <main>
      <!-- Hero section -->
      <div class="relative">
        <div class="absolute inset-x-0 bottom-0 bg-gray-100 h-1/2" />
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div class="absolute inset-0">
              <img
                class="object-cover w-full h-full"
                src="../assets/gympilot-1.jpg"
                alt="hero-image"
              />
              <div
                class="absolute inset-0 bg-gradient-to-r from-slate-500 to-slate-400 mix-blend-multiply"
              />
            </div>
            <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1
                class="text-4xl font-extrabold tracking-tight text-center sm:text-5xl lg:text-6xl"
              >
                <span class="block text-white">Take control of your</span>
                <span class="block text-white">customer support</span>
              </h1>
              <p
                class="max-w-lg mx-auto mt-6 text-xl text-center text-white sm:max-w-3xl"
              >
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              <div
                class="max-w-sm mx-auto mt-10 sm:max-w-none sm:flex sm:justify-center"
              >
                <div
                  class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5"
                >
                  <a
                    href="#"
                    class="flex items-center justify-center px-4 py-3 text-base font-medium bg-white border border-transparent rounded-md shadow-sm text-slate-900 hover:bg-emerald-100 sm:px-8"
                  >
                    Get started
                  </a>
                  <a
                    href="#"
                    class="flex items-center justify-center px-4 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-emerald-500 hover:bg-emerald-400 sm:px-8"
                  >
                    Live demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Logo Cloud -->
      <div class="bg-gray-100">
        <div class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p
            class="text-sm font-semibold tracking-wide text-center text-gray-500 uppercase"
          >
            Trusted by over 5 very average small businesses
          </p>
          <div
            class="grid grid-cols-2 gap-8 mt-6 md:grid-cols-6 lg:grid-cols-5"
          >
            <div
              class="flex justify-center col-span-1 md:col-span-2 lg:col-span-1"
            >
              <img
                class="h-12"
                src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                alt="Tuple"
              />
            </div>
            <div
              class="flex justify-center col-span-1 md:col-span-2 lg:col-span-1"
            >
              <img
                class="h-12"
                src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg"
                alt="Mirage"
              />
            </div>
            <div
              class="flex justify-center col-span-1 md:col-span-2 lg:col-span-1"
            >
              <img
                class="h-12"
                src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                alt="StaticKit"
              />
            </div>
            <div
              class="flex justify-center col-span-1 md:col-span-2 md:col-start-2 lg:col-span-1"
            >
              <img
                class="h-12"
                src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
                alt="Transistor"
              />
            </div>
            <div
              class="flex justify-center col-span-2 md:col-span-2 md:col-start-4 lg:col-span-1"
            >
              <img
                class="h-12"
                src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                alt="Workcation"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Alternating Feature Sections -->
      <div class="relative pt-16 pb-32 overflow-hidden">
        <div
          aria-hidden="true"
          class="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
        />
        <div class="relative">
          <div
            class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24"
          >
            <div
              class="max-w-xl px-4 mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0"
            >
              <div>
                <div>
                  <span
                    class="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-r from-emerald-300 to-green-500"
                  >
                    <font-awesome-icon
                      :icon="['fa', 'bars']"
                      class="w-6 h-6 text-white"
                      aria-hidden="true"
                    >
                    </font-awesome-icon>
                  </span>
                </div>
                <div class="mt-6">
                  <h2
                    class="text-3xl font-extrabold tracking-tight text-gray-900"
                  >
                    Stay on top of customer support
                  </h2>
                  <p class="mt-4 text-lg text-gray-500">
                    Semper curabitur ullamcorper posuere nunc sed. Ornare
                    iaculis bibendum malesuada faucibus lacinia porttitor.
                    Pulvinar laoreet sagittis viverra duis. In venenatis sem
                    arcu pretium pharetra at. Lectus viverra dui tellus ornare
                    pharetra.
                  </p>
                  <div class="mt-6">
                    <a
                      href="#"
                      class="inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-emerald-300 to-green-500 bg-origin-border hover:from-green-500 hover:to-green-500"
                    >
                      Get started
                    </a>
                  </div>
                </div>
              </div>
              <div class="pt-6 mt-8 border-t border-gray-200">
                <blockquote>
                  <div>
                    <p class="text-base text-gray-500">
                      &ldquo;Cras velit quis eros eget rhoncus lacus ultrices
                      sed diam. Sit orci risus aenean curabitur donec aliquet.
                      Mi venenatis in euismod ut.&rdquo;
                    </p>
                  </div>
                  <footer class="mt-3">
                    <div class="flex items-center space-x-3">
                      <div class="flex-shrink-0">
                        <img
                          class="w-6 h-6 rounded-full"
                          src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                          alt=""
                        />
                      </div>
                      <div class="text-base font-medium text-gray-700">
                        Marcia Hill, Digital Marketing Manager
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
            <div class="mt-12 sm:mt-16 lg:mt-0">
              <div
                class="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full"
              >
                <img
                  class="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="../assets/gympilot-4.jpg"
                  alt="gym patron lifting tire"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-24">
          <div
            class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24"
          >
            <div
              class="max-w-xl px-4 mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2"
            >
              <div>
                <div>
                  <span
                    class="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-r from-emerald-300 to-green-500"
                  >
                    <font-awesome-icon
                      :icon="['fa', 'user']"
                      class="w-6 h-6 text-white"
                      aria-hidden="true"
                    >
                    </font-awesome-icon>
                  </span>
                </div>
                <div class="mt-6">
                  <h2
                    class="text-3xl font-extrabold tracking-tight text-gray-900"
                  >
                    Better understand your customers
                  </h2>
                  <p class="mt-4 text-lg text-gray-500">
                    Semper curabitur ullamcorper posuere nunc sed. Ornare
                    iaculis bibendum malesuada faucibus lacinia porttitor.
                    Pulvinar laoreet sagittis viverra duis. In venenatis sem
                    arcu pretium pharetra at. Lectus viverra dui tellus ornare
                    pharetra.
                  </p>
                  <div class="mt-6">
                    <a
                      href="#"
                      class="inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-emerald-300 to-green-500 bg-origin-border hover:from-green-500 hover:to-green-500"
                    >
                      Get started
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
              <div
                class="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full"
              >
                <img
                  class="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="../assets/gympilot-2.jpg"
                  alt="women in yoga class"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Gradient Feature Section -->
      <div class="border-gray-200">
        <div
          class="max-w-4xl px-4 py-16 mx-auto text-center mb-28 bg-emerald-400 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8 rounded-xl"
        >
          <h2 class="text-3xl font-extrabold tracking-tight text-white">
            Inbox support built for efficiency
          </h2>
          <div>
            <p class="mt-4 text-lg text-white">
              Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et
              magna sit morbi lobortis. Blandit aliquam sit nisl euismod mattis
              in.
            </p>
          </div>
          <div
            class="grid grid-cols-1 mt-12 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16"
          >
            <div
              v-for="feature in features"
              :key="feature.name"
              class="flex flex-col items-center"
            >
              <div>
                <span
                  class="flex items-center justify-center w-12 h-12 rounded-md bg-emerald-600"
                >
                  <font-awesome-icon
                    :icon="feature.icon"
                    class="w-6 h-6 text-white"
                    aria-hidden="true"
                  >
                  </font-awesome-icon>
                </span>
              </div>
              <div class="mt-6">
                <h3 class="text-lg font-bold text-white">
                  {{ feature.name }}
                </h3>
                <p class="mt-2 text-base text-white">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats section -->
      <div class="relative bg-gray-900">
        <div class="absolute inset-x-0 bottom-0 h-80 xl:top-0 xl:h-full">
          <div class="w-full h-full xl:grid xl:grid-cols-2">
            <div class="h-full xl:relative xl:col-start-2">
              <img
                class="object-cover w-full h-full opacity-25 xl:absolute xl:inset-0"
                src="../assets/gympilot-3.jpg"
                alt="exercise class"
              />
              <div
                aria-hidden="true"
                class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
              />
            </div>
          </div>
        </div>
        <div
          class="max-w-4xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8"
        >
          <div
            class="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24"
          >
            <h2 class="text-sm font-semibold tracking-wide uppercase">
              <span
                class="text-transparent bg-gradient-to-r from-emerald-300 to-green-500 bg-clip-text"
                >Valuable Metrics</span
              >
            </h2>
            <p class="mt-3 text-3xl font-extrabold text-white">
              Get actionable data that will help grow your business
            </p>
            <p class="mt-5 text-lg text-gray-300">
              Rhoncus sagittis risus arcu erat lectus bibendum. Ut in adipiscing
              quis in viverra tristique sem. Ornare feugiat viverra eleifend
              fusce orci in quis amet. Sit in et vitae tortor, massa. Dapibus
              laoreet amet lacus nibh integer quis. Eu vulputate diam sit tellus
              quis at.
            </p>
            <div class="grid grid-cols-1 mt-12 gap-y-12 gap-x-6 sm:grid-cols-2">
              <p v-for="item in metrics" :key="item.id">
                <span class="block text-2xl font-bold text-white">{{
                  item.stat
                }}</span>
                <span class="block mt-1 text-base text-gray-300"
                  ><span class="font-medium text-white">{{
                    item.emphasis
                  }}</span>
                  {{ item.rest }}</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-white">
        <div
          class="max-w-4xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:items-center lg:justify-between"
        >
          <h2
            class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            <span class="block">Ready to get started?</span>
            <span
              class="block pb-1 -mb-1 text-transparent bg-gradient-to-r from-emerald-300 to-green-500 bg-clip-text"
              >Get in touch or create an account.</span
            >
          </h2>
          <div class="mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
            <a
              href="#"
              class="flex items-center justify-center px-4 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-emerald-300 to-green-500 bg-origin-border hover:from-green-500 hover:to-green-500"
            >
              Learn more
            </a>
            <a
              href="#"
              class="flex items-center justify-center px-4 py-3 text-base font-medium border border-transparent rounded-md shadow-sm text-emerald-800 bg-emerald-50 hover:bg-emerald-100"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-gray-50" aria-labelledby="footer-heading">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="px-4 pt-16 pb-8 mx-auto max-w-7xl sm:px-6 lg:pt-24 lg:px-8">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="grid grid-cols-2 gap-8 xl:col-span-2">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3
                  class="text-sm font-semibold tracking-wider text-gray-400 uppercase"
                >
                  Solutions
                </h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li
                    v-for="item in footerNavigation.solutions"
                    :key="item.name"
                  >
                    <a
                      :href="item.href"
                      class="text-base text-gray-500 hover:text-gray-900"
                    >
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mt-12 md:mt-0">
                <h3
                  class="text-sm font-semibold tracking-wider text-gray-400 uppercase"
                >
                  Support
                </h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li v-for="item in footerNavigation.support" :key="item.name">
                    <a
                      :href="item.href"
                      class="text-base text-gray-500 hover:text-gray-900"
                    >
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3
                  class="text-sm font-semibold tracking-wider text-gray-400 uppercase"
                >
                  Company
                </h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li v-for="item in footerNavigation.company" :key="item.name">
                    <a
                      :href="item.href"
                      class="text-base text-gray-500 hover:text-gray-900"
                    >
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mt-12 md:mt-0">
                <h3
                  class="text-sm font-semibold tracking-wider text-gray-400 uppercase"
                >
                  Legal
                </h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li v-for="item in footerNavigation.legal" :key="item.name">
                    <a
                      :href="item.href"
                      class="text-base text-gray-500 hover:text-gray-900"
                    >
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mt-12 xl:mt-0">
            <h3
              class="text-sm font-semibold tracking-wider text-gray-400 uppercase"
            >
              Subscribe to our newsletter
            </h3>
            <p class="mt-4 text-base text-gray-500">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <form class="mt-4 sm:flex sm:max-w-md">
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                type="email"
                name="email-address"
                autocomplete="email"
                required=""
                class="w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:placeholder-gray-400"
                placeholder="Enter your email"
              />
              <div class="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  class="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-emerald-300 to-green-500 bg-origin-border hover:from-green-500 hover:to-green-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          class="pt-8 mt-12 border-t border-gray-200 md:flex md:items-center md:justify-between lg:mt-16"
        >
          <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2023 Gympilot, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";

const solutions = [
  {
    name: "Inbox",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ["fa", "dumbbell"],
  },
  {
    name: "Messaging",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: ["fa", "user"],
  },
  {
    name: "Live Chat",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ["fa", "door-open"],
  },
  {
    name: "Knowledge Base",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ["fa", "check"],
  },
];
const features = [
  {
    name: "Unlimited Inboxes",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ["fa", "check"],
  },
  {
    name: "Manage Team Members",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ["fa", "lock"],
  },
  {
    name: "Spam Report",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ["fa", "check"],
  },
  {
    name: "Compose in Markdown",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ["fa", "user"],
  },
  {
    name: "Team Reporting",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ["fa", "bars"],
  },
  {
    name: "Saved Replies",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ["fa", "magnifying-glass"],
  },
  {
    name: "Email Commenting",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ["fa", "check"],
  },
  {
    name: "Connect with Customers",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ["fa", "envelope-square"],
  },
];
const metrics = [
  {
    id: 1,
    stat: "8K+",
    emphasis: "Companies",
    rest: "use laoreet amet lacus nibh integer quis.",
  },
  {
    id: 2,
    stat: "25K+",
    emphasis: "Countries around the globe",
    rest: "lacus nibh integer quis.",
  },
  {
    id: 3,
    stat: "98%",
    emphasis: "Customer satisfaction",
    rest: "laoreet amet lacus nibh integer quis.",
  },
  {
    id: 4,
    stat: "12M+",
    emphasis: "Issues resolved",
    rest: "lacus nibh integer quis.",
  },
];
const footerNavigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Status", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

export default defineComponent({
  components: {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
  },
  setup() {
    return {
      solutions,
      features,
      metrics,
      footerNavigation,
    };
  },
});
</script>
