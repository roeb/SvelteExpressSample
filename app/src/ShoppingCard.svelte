<script>
  import axios from "axios";
  import { onMount } from "svelte";

  import Header from "./components/header.svelte";
  import Item from "./components/item.svelte";
  import AddItem from "./components/addItem.svelte";

  let shoppingCardItems = [];

  onMount(async () => {
    loadShoppingCard();
  });

  const loadShoppingCard = async () => {
    var res = await axios.get("http://localhost:3000/shoppingcard");
    shoppingCardItems = res.data;
  };

  const addItem = e => {
    loadShoppingCard();
  };

  const removeItem = e => {
    console.log(e.detail);
  };
</script>

<Header />
<div class="container">
  <AddItem on:addShoppingCardItem={addItem} />

  {#if shoppingCardItems.length === 0}
    <p>No item in shopping card</p>
  {:else}
    {#each shoppingCardItems as item}
      <Item
        id={item.article.id}
        name={item.article.name}
        amount={item.amount}
        price={item.article.price}
        sum={item.sum}
        on:removeItem={removeItem} />
    {/each}
  {/if}
</div>
