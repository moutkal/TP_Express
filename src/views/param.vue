<template>
  <div class="about">
    <h1>URL à paramètre</h1>
    <p>Ceci est le paramètre : {{$route.params.chaine}}</p>
  </div>
</template>

export default{
  name: 'param',
}
