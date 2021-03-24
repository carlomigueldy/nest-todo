<template>
  <div class="container">
    <c-box m="10" borderRadius="md" boxShadow="lg" p="5">
      <c-heading mb="10">Add Todo</c-heading>
      <form @submit.prevent="createTodo">
        <c-stack spacing="3">
          <c-form-control>
            <c-form-label for="title">Title</c-form-label>
            <c-input
              id="title"
              v-model="createTodoDtoForm.title"
              placeholder="Todo title"
              aria-describedby="todo-helper-text"
            />
            <c-form-helper-text id="todo-helper-text">
              What is the title of this task?
            </c-form-helper-text>
          </c-form-control>
          <c-form-control>
            <c-form-label for="description">Description</c-form-label>
            <c-input
              id="description"
              v-model="createTodoDtoForm.description"
              placeholder="Here is a sample placeholder"
              aria-describedby="description-helper-text"
            />
            <c-form-helper-text id="description-helper-text">
              Describe the task
            </c-form-helper-text>
          </c-form-control>
          <c-button type="submit" size="lg" variant-color="green">
            Submit
          </c-button>
        </c-stack>
      </form>

      <code>{{ state.form }}</code>
    </c-box>

    <c-box m="10" p="5" borderRadius="md" boxShadow="lg">
      <c-list v-if="hasTodos" spacing="3">
        <c-list-item
          v-for="({ title, _id }, index) in state.todos"
          :key="index"
        >
          <c-list-icon icon="check-circle" color="blue.500" />
          {{ title }}
          <c-button @click="deleteTodo(_id)">Delete</c-button>
          <c-button @click="editTodo(_id)">Edit</c-button>
        </c-list-item>
      </c-list>
    </c-box>

    <!-- edit modal -->
    <c-modal
      :is-open="modalController.opened"
      :closeOnOverlayClick="false"
      is-centered
    >
      <c-modal-content ref="content">
        <c-modal-header>Edit Todo</c-modal-header>
        <c-modal-close-button
          @click="modalController.opened = !modalController.opened"
        />
        <c-modal-body>
          <form @submit.prevent="updateTodo">
            <c-stack spacing="3">
              <c-form-control>
                <c-form-label for="title">Title</c-form-label>
                <c-input
                  id="title"
                  v-model="editTodoDtoForm.title"
                  placeholder="Todo title"
                  aria-describedby="todo-helper-text"
                />
                <c-form-helper-text id="todo-helper-text">
                  What is the title of this task?
                </c-form-helper-text>
              </c-form-control>
              <c-form-control>
                <c-form-label for="description">Description</c-form-label>
                <c-input
                  id="description"
                  v-model="editTodoDtoForm.description"
                  placeholder="Here is a sample placeholder"
                  aria-describedby="description-helper-text"
                />
                <c-form-helper-text id="description-helper-text">
                  Describe the task
                </c-form-helper-text>
              </c-form-control>
              <c-button type="submit" size="lg" variant-color="green">
                Submit
              </c-button>
            </c-stack>
          </form>
        </c-modal-body>
        <c-modal-footer>
          <c-button @click="modalController.opened = !modalController.opened">
            Cancel
          </c-button>
        </c-modal-footer>
      </c-modal-content>
      <c-modal-overlay />
    </c-modal>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
  useContext
} from "@nuxtjs/composition-api";

type Todo = {
  title: string;
  description?: string;
  categories?: string[];
  isCompleted: boolean;
};

interface TodoDto {
  _id?: string;
  title: string;
  description?: string;
  categories?: string[];
}

type State = {
  showModal: boolean;
  todos: Todo[];
};

const initialCreateTodoDto: TodoDto = {
  _id: null,
  title: "",
  description: "",
  categories: []
};

export default defineComponent({
  setup() {
    const ctx = useContext();
    const state = reactive<State>({
      showModal: false,
      todos: [
        {
          title: "Test",
          description: "",
          categories: [],
          isCompleted: false
        }
      ]
    });
    const modalController = ref({ opened: false });
    const createTodoDtoForm = ref<TodoDto>({ ...initialCreateTodoDto });
    const editTodoDtoForm = ref<TodoDto>({ ...initialCreateTodoDto });
    const hasTodos = computed(() => state.todos.length > 0);
    const $chakraColorMode: any = inject("$chakraColorMode");
    const $toggleColorMode: any = inject("$toggleColorMode");
    const colorMode = computed(() => $chakraColorMode());
    const toggleColorMode = computed(() => $toggleColorMode());
    // @ts-ignore
    const theme = computed(() => ctx.$chakraTheme());
    function showToast() {
      // @ts-ignore
      this.$toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 10000,
        isClosable: true
      });
    }
    async function createTodo() {
      console.log("createTodo", createTodoDtoForm.value);

      // @ts-ignore
      const data = await ctx.$axios.$post("todos", createTodoDtoForm.value);
      getAllTodo();

      // @ts-ignore
      this.$toast({
        title: "Created",
        description: "A new todo has been created",
        status: "success",
        duration: 2000,
        isClosable: true
      });
      createTodoDtoForm.value = { ...initialCreateTodoDto };
      console.log({ data }, createTodoDtoForm.value);
    }
    async function updateTodo() {
      // @ts-ignore
      const data = await ctx.$axios.$put(
        `todos/${editTodoDtoForm.value._id}`,
        editTodoDtoForm.value
      );
      getAllTodo();

      // @ts-ignore
      this.$toast({
        title: "Updated",
        description: "Todo has been updated",
        status: "info",
        duration: 2000,
        isClosable: true
      });
      console.log({ data }, editTodoDtoForm.value);
      modalController.value.opened = false;
    }
    async function getAllTodo() {
      // @ts-ignore
      const todos = await ctx.$axios.$get("todos");
      state.todos = todos;
    }
    async function deleteTodo(id: string) {
      // @ts-ignore
      const deletedData = await ctx.$axios.$delete(`todos/${id}`);
      console.log(deletedData);
      getAllTodo();
    }
    async function editTodo(id: string) {
      // @ts-ignore
      const todo = await ctx.$axios.$get(`todos/${id}`);
      editTodoDtoForm.value = todo;
      modalController.value.opened = true;
    }

    onMounted(() => {
      getAllTodo();
    });

    return {
      state,
      colorMode,
      toggleColorMode,
      theme,
      hasTodos,
      showToast,
      createTodo,
      updateTodo,
      deleteTodo,
      editTodo,
      createTodoDtoForm,
      editTodoDtoForm,
      modalController
    };
  }
});
</script>

<style scoped>
body {
  font-family: "Sora";
}

.container {
  height: 100vh;
}
</style>
