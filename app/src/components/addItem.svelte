<script>
  import axios from "axios";

  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let articels = [];
  let selectedArticle;
  let amount = 0;

  onMount(async () => {
    var res = await axios.get("http://localhost:3000/articels");
    articels = res.data;
    selectedArticle = articels[0];
  });

  const onSubmit = async e => {
    e.preventDefault();
    let shoppingCardItemReq = {
      articleId: selectedArticle.id,
      amount: amount
    };

    await axios.post("http://localhost:3000/shoppingcard", shoppingCardItemReq);
    dispatch("addShoppingCardItem", shoppingCardItemReq);
  };
</script>

<form class="card" on:submit={onSubmit}>
  {#if selectedArticle !== undefined}
    <h4>Select an item to add it to the shopping cart</h4>
    <select bind:value={selectedArticle}>
      {#each articels as article}
        <option value={article}>{article.name}</option>
      {/each}
    </select>

    <div class="grid-3">
      <input type="number" placeholder="Amount of items" bind:value={amount} />
      <input type="submit" class="btn btn-primary" value="Add Item" />
    </div>
  {/if}

</form>
