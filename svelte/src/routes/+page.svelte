<script lang="ts">
	import Button from '$lib/components/atoms/Button/Button.svelte';
	import Icon from '$lib/components/atoms/Icon/Icon.svelte';
	import { Codesandbox, Layout, ArrowRight, Component, Settings, FormInput } from 'lucide-svelte';
</script>

<div class="landing-page">
	<main class="hero-section">
		<div class="content-wrapper">
			<div class="logo-area">
				<Icon icon={Codesandbox} size={64} class="text-action-primary" />
			</div>
			<h1 class="title">Vyasa UI</h1>
			<p class="subtitle">
				A modern, performant Svelte 5 component library and IDE framework.
				<br />Built for building beautiful developer tools.
			</p>

			<div class="actions">
				<a href="/ide-demo" class="card-link">
					<div class="card">
						<div class="card-icon">
							<Icon icon={Layout} size={32} />
						</div>
						<div class="card-content">
							<h3>IDE Demo</h3>
							<p>Experience the full IDE layout with the new CodeEditor.</p>
						</div>
						<div class="card-arrow">
							<Icon icon={ArrowRight} size={20} />
						</div>
					</div>
				</a>

				<a href="/kitchen-sink" class="card-link">
					<div class="card">
						<div class="card-icon">
							<Icon icon={Component} size={32} />
						</div>
						<div class="card-content">
							<h3>Kitchen Sink</h3>
							<p>Explore the complete atomic component library.</p>
						</div>
						<div class="card-arrow">
							<Icon icon={ArrowRight} size={20} />
						</div>
					</div>
				</a>

				<a href="/settings-demo" class="card-link">
					<div class="card">
						<div class="card-icon">
							<Icon icon={Settings} size={32} />
						</div>
						<div class="card-content">
							<h3>Settings Panel</h3>
							<p>A schema-driven settings UI component.</p>
						</div>
						<div class="card-arrow">
							<Icon icon={ArrowRight} size={20} />
						</div>
					</div>
				</a>

				<a href="/forms-demo" class="card-link">
					<div class="card">
						<div class="card-icon">
							<Icon icon={FormInput} size={32} />
						</div>
						<div class="card-content">
							<h3>Forms Demo</h3>
							<p>
								Showcase of the comprehensive form system including grid layouts and rich inputs.
							</p>
						</div>
						<div class="card-arrow">
							<Icon icon={ArrowRight} size={20} />
						</div>
					</div>
				</a>
			</div>
		</div>
	</main>
</div>

<style>
	.landing-page {
		min-height: 100vh;
		background-color: var(--bg-surface);
		color: var(--text-primary);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: var(--font-sans);
	}

	.hero-section {
		width: 100%;
		max-width: 800px;
		padding: 2rem;
		text-align: center;
	}

	.content-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.logo-area {
		margin-bottom: 1rem;
		color: var(--action-primary);
	}

	.title {
		font-size: 3.5rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		background: linear-gradient(135deg, var(--text-primary) 0%, var(--action-primary) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 0;
	}

	.subtitle {
		font-size: 1.25rem;
		color: var(--text-secondary);
		line-height: 1.6;
		max-width: 600px;
		margin: 0 auto 2rem;
	}

	.actions {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		width: 100%;
		max-width: 700px;
	}

	@media (min-width: 640px) {
		.actions {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	.card-link {
		text-decoration: none;
		color: inherit;
		outline: none;
	}

	.card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 2rem;
		background-color: var(--bg-surface-alt);
		border: 1px solid var(--border-base);
		border-radius: 1rem;
		transition: all 0.2s ease-in-out;
		height: 100%;
		text-align: left;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.card:hover {
		transform: translateY(-4px);
		border-color: var(--action-primary);
		box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
	}

	.card-icon {
		margin-bottom: 1rem;
		color: var(--action-primary);
		background-color: color-mix(in srgb, var(--action-primary), transparent 90%);
		padding: 0.75rem;
		border-radius: 0.75rem;
	}

	.card-content h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
		color: var(--text-primary);
	}

	.card-content p {
		font-size: 0.95rem;
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.5;
	}

	.card-arrow {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		color: var(--text-tertiary);
		opacity: 0;
		transform: translateX(-10px);
		transition: all 0.2s ease;
	}

	.card:hover .card-arrow {
		opacity: 1;
		transform: translateX(0);
		color: var(--action-primary);
	}

	:global(.text-action-primary) {
		color: var(--action-primary);
	}
</style>
