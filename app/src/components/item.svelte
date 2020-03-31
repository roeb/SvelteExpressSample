<script>
  export let id;
  export let name;
  export let amount;
  export let price;
  export let sum;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const onRemoveItem = () => {
    dispatch("removeItem", id);
  };
</script>

<style>
  .title {
    display: flex;
    align-items: center;
  }

  .title small {
    color: #222;
    margin-left: 20px;
  }

  .title .actions {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .details span {
    display: block;
  }

  .price {
    font-weight: 600;
    text-decoration: underline;
    margin-top: 30px;
  }
</style>

<div class="card">
  <div class="title">
    <h3>{name}</h3>
    <div class="actions">
      <button class="btn btn-sm btn-danger" on:click={onRemoveItem}>-</button>
    </div>

  </div>

  <div class="details">
    <span>Amount: {amount}</span>
    <span>Price per Unit: {price} Euro</span>
  </div>

  <div class="price">Price: {sum} Euro</div>
</div>
