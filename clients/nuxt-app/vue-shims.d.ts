import { Plugin } from "@nuxt/types";

declare type ChakraToastOption = {
  title?: string;
  description?: string;
  status?: "success" | "error" | "warning" | "info";
  isClosable?: boolean;
  variant?: "solid" | "subtle" | "left-accent" | "top-accent";
  duration?: number;
  onClose?: () => void;
  position?:
    | "top"
    | "top-left"
    | "top-right"
    | "bottom"
    | "bottom-left"
    | "bottom-right";
  render?: (props: { onClose: () => void; id: string }) => Vue.VNode;
};

declare module "vue/types/vue" {
  interface Vue {
    $toast(option: ChakraToastOption): void;
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $toast(option: ChakraToastOption): void;
  }

  interface Context {
    $toast(option: ChakraToastOption): void;
  }
}

declare module "vuex/types/index" {
  interface Store<S> {
    $toast(option: ChakraToastOption): void;
  }
}

const myPlugin: Plugin = (context, inject) => {
  inject("toast", (option: ChakraToastOption) => console.log(option));
};

export default myPlugin;
