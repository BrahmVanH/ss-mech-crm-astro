<script lang="ts">

  let dialog: HTMLDialogElement;

  function handleShowDialog(event: MouseEvent) {
    event.preventDefault();
    console.log('showing dialog');
    dialog.showModal();
  }

  function handleCloseDialog() {
    dialog.close();
  }
</script>

<div>
  <button on:click={handleShowDialog} class="text-xs underline ml-1">
    edit
  </button>
  <dialog bind:this={dialog} class="max-w-[50%] max-h-[50%]">
    <div class="flex w-full justify-end sticky top-0">
      <button
        class="mx-2 mt-1 px-1 pb-1 top-0 bg-gray-400"
        on:click={handleCloseDialog}
      >
        x
      </button>
    </div>
    <slot/>
  </dialog>
</div>
