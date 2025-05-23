<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Edit, Check, X, Trash } from '@lucide/svelte';

	let { data } = $props();

	let isEditing = $state(false);
	let selectedTaskId = $state();
</script>

<div class="flex space-x-8 p-8">
	<!-- Create Task Section -->
	<section>
		<form method="POST" action="?/create">
			<Card.Root class="w-[350px]">
				<Card.Header>
					<Card.Title>Create task</Card.Title>
					<Card.Description>Fill title and description</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="grid w-full items-center gap-4">
						<div class="flex flex-col space-y-1.5">
							<Label for="title">Title</Label>
							<Input name="title" id="title" placeholder="Task one" />
						</div>

						<div class="flex flex-col space-y-1.5">
							<Label for="description">Description (Optionnal)</Label>
							<Textarea name="description" id="description" placeholder="Task one" />
						</div>
					</div>
				</Card.Content>
				<Card.Footer class="flex justify-between">
					<Button class="cursor-pointer" type="submit">Create</Button>
				</Card.Footer>
			</Card.Root>
		</form>
	</section>

	<!-- Not completed Tasks Section -->
	<section class="flex flex-col space-y-4">
		<div>
			<h2 class="text-2xl font-bold">Tasks</h2>
			<p class="text-muted-foreground text-sm">
				Here are the tasks you have created. You can edit or delete them.
			</p>
		</div>
		{#each data.tasks.filter((task) => !task.completed) as task}
			<Card.Root class="w-full">
				<!-- Header section with possible editing -->
				<form action="?/updateTask" method="POST" class="space-y-1">
					<Card.Header class="flex items-start justify-between">
						<div class="space-y-1">
							{#if !isEditing || selectedTaskId !== task.id}
								<Card.Title>{task.title}</Card.Title>
								<Card.Description
									>{task.description == '' || !task.description
										? 'No description'
										: task.description}</Card.Description
								>
							{:else}
								<input type="hidden" name="id" value={task.id} />
								<Card.Title>
									<Input name="title" id="title" value={task.title} placeholder="Task one" />
								</Card.Title>
								<Card.Description>
									<Textarea
										name="description"
										id="description"
										value={task.description}
										placeholder="Task one"
									/>
								</Card.Description>
							{/if}
						</div>
						<div>
							{#if !isEditing || selectedTaskId !== task.id}
								<Button
									variant="outline"
									type="button"
									onclick={() => {
										isEditing = !isEditing;
										selectedTaskId = task.id;
									}}
								>
									<Edit size="4" />
								</Button>
							{:else}
								<Button
									type="button"
									variant="outline"
									onclick={() => {
										isEditing = !isEditing;
										selectedTaskId = null;
									}}
								>
									<X size="4" />
								</Button>
								<Button variant="outline" type="submit">
									<Check size="4" />
								</Button>
							{/if}
						</div>
					</Card.Header>
				</form>

				<!-- Content section with checkbox to mark as completed -->
				<Card.Content>
					<div class="flex items-center space-x-2">
						<form action="?/updateCompleted" method="POST">
							<input type="hidden" name="id" value={task.id} />
							<Checkbox
								class="cursor-pointer"
								type="submit"
								name="completed"
								id="terms"
								bind:checked={task.completed}
							/>
						</form>
						<Label
							for="terms2"
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[disabled=true]:cursor-not-allowed peer-data-[disabled=true]:opacity-70"
						>
							{task.completed ? 'Completed' : 'Not completed'}
						</Label>
					</div>
				</Card.Content>
				<!-- Footer section with delete button -->
				<Card.Footer class="flex justify-end">
					<form action="?/deleteTask" method="POST">
						<input type="hidden" name="id" value={task.id} />
						<Button variant="destructive" type="submit" class="cursor-pointer">
							<Trash size="4" />
						</Button>
					</form>
				</Card.Footer>
			</Card.Root>
		{/each}
	</section>

	<!-- Completed Tasks Section -->
	<section class="flex flex-col space-y-4">
		<div>
			<h2 class="text-2xl font-bold">Tasks</h2>
			<p class="text-muted-foreground text-sm">Here are the tasks you have done.</p>
		</div>
		{#each data.tasks.filter((task) => task.completed) as task}
			<Card.Root class="w-full">
				<Card.Header>
					<Card.Title>{task.title}</Card.Title>
					<Card.Description>{task.description ?? 'No description'}</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="flex items-center space-x-2">
						<form action="?/updateCompleted" method="POST">
							<input type="hidden" name="id" value={task.id} />
							<Checkbox
								class="cursor-pointer"
								type="submit"
								name="completed"
								id="terms"
								bind:checked={task.completed}
							/>
						</form>
						<Label
							for="terms2"
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[disabled=true]:cursor-not-allowed peer-data-[disabled=true]:opacity-70"
						>
							{task.completed ? 'Completed' : 'Not completed'}
						</Label>
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
	</section>
</div>
