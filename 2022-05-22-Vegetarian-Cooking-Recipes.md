---
title: Vegetarian recipes
created: Tu 22.05.2022, 17:06:11
author: Kyle Klus
categories: Kyles-Cookbook cooking vegetarian moc
layout: post_moc
backlink: /Kyles-Cookbook.html
tags: status/not_tree
---
{% assign recipes = site.categories.cooking | where: "categories", "vegetarian" %}
{% assign forallRecipes = site.categories.cooking | where: "categories", "forall" %}
{% assign recipes = recipes | concat: forallRecipes %}
{% assign veganRecipes = site.categories.cooking | where: "categories", "vegan" %}
{% assign recipes = recipes | concat: veganRecipes %}
{% assign recipes = recipes | where: "categories", "recipe" %}

{% assign savory = recipes | where: "categories", "savory" %}
{% if savory != blank %}

## Savory Dishes

{% for post in savory %}

- [{{post.title}}]({{post.url}})

{% endfor %}
{% endif %}

{% assign sweet = recipes | where: "categories", "sweet" %}
{% if sweet != blank %}

## Sweet Dishes

{% for post in sweet %}

- [{{post.title}}]({{post.url}})

{% endfor %}
{% endif %}

{% assign extraingredients = recipes | where: "categories", "extraingredients" %}
{% if extraingredients != blank %}

## Extra Ingredients

{% for post in extraingredients %}

- [{{post.title}}]({{post.url}})

{% endfor %}
{% endif %}

{% assign sauces = recipes | where: "categories", "sauces" %}
{% if sauces != blank %}

## Sauces

{% for post in sauces %}

- [{{post.title}}]({{post.url}})

{% endfor %}
{% endif %}
