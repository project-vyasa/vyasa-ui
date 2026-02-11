<script lang="ts">
	import Form from '$lib/components/molecules/Form/Form.svelte';
	import DemoToolbar from '$lib/components/organisms/DemoToolbar/DemoToolbar.svelte';
	import FormField from '$lib/components/molecules/FormField/FormField.svelte';
	import Input from '$lib/components/atoms/Input/Input.svelte';
	import InputColor from '$lib/components/atoms/InputColor/InputColor.svelte';
	import Select from '$lib/components/molecules/Select/Select.svelte';
	import Switch from '$lib/components/atoms/Switch/Switch.svelte';
	import Textarea from '$lib/components/atoms/Textarea/Textarea.svelte';
	import Checkbox from '$lib/components/atoms/Checkbox/Checkbox.svelte';
	import Button from '$lib/components/atoms/Button/Button.svelte';
	import { Search as SearchIcon } from 'lucide-svelte';
	import Icon from '$lib/components/atoms/Icon/Icon.svelte';

	let formData = $state({
		// Search
		search: '',
		// Profile
		firstName: '',
		lastName: '',
		email: '',
		bio: '',
		// Preferences
		role: 'developer',
		themeColor: '#007bff',
		dob: '',
		notifications: true,
		// Contact
		phone: '',
		website: '',
		country: 'usa',
		// Typography
		fontFamily: 'inter',
		fontSize: 16,
		// Date & Time
		meetingTime: '',
		month: '',
		week: '',
		// Terms
		agreeToTerms: false
	});

	let errors = $state({
		email: ''
	});

	const roles = [
		{ label: 'Developer', value: 'developer' },
		{ label: 'Designer', value: 'designer' },
		{ label: 'Product Manager', value: 'pm' }
	];

	const fonts = [
		{ label: 'Inter', value: 'inter' },
		{ label: 'Roboto', value: 'roboto' },
		{ label: 'Fira Code', value: 'fira-code' },
		{ label: 'Comic Sans MS', value: 'comic-sans' }
	];

	function validate() {
		if (formData.email && !formData.email.includes('@')) {
			errors.email = 'Please enter a valid email address';
		} else {
			errors.email = '';
		}
	}
</script>

<div class="page-container">
	<DemoToolbar title="Form System Demo" backUrl="/" />

	<div class="content">
		<!-- Search Bar -->
		<section class="search-section">
			<Input type="search" placeholder="Search..." bind:value={formData.search} fullWidth>
				{#snippet prefix()}
					<Icon icon={SearchIcon} size={18} class="text-secondary" />
				{/snippet}
			</Input>
		</section>

		<!-- Section 1: Basic Grid Layout -->
		<section class="card">
			<header>
				<h2>Profile Information</h2>
				<p>A standard 2-column form layout.</p>
			</header>
			<div class="card-body">
				<Form columns={2} gap="md">
					<FormField id="firstName" label="First Name" required>
						<Input id="firstName" bind:value={formData.firstName} placeholder="John" fullWidth />
					</FormField>

					<FormField id="lastName" label="Last Name" required>
						<Input id="lastName" bind:value={formData.lastName} placeholder="Doe" fullWidth />
					</FormField>

					<!-- Spanning full width in a 2-col grid -->
					<div style="grid-column: span 2;">
						<FormField
							id="email"
							label="Email Address"
							required
							error={errors.email}
							hint="We'll never share your email with anyone else."
						>
							<Input
								type="email"
								id="email"
								bind:value={formData.email}
								placeholder="john@example.com"
								fullWidth
								oninput={validate}
								error={!!errors.email}
							/>
						</FormField>
					</div>

					<div style="grid-column: span 2;">
						<FormField id="bio" label="Bio" hint="Tell us a little about yourself.">
							<Textarea id="bio" bind:value={formData.bio} rows={3} fullWidth />
						</FormField>
					</div>
				</Form>
			</div>
		</section>

		<!-- Section 2: Horizontal Layout & Specialized Inputs -->
		<section class="card">
			<header>
				<h2>Preferences</h2>
				<p>Demonstrating horizontal layout, Select, Color, and Switch.</p>
			</header>
			<div class="card-body">
				<Form gap="md">
					<FormField
						id="role"
						label="Job Role"
						layout="horizontal"
						align="center"
						description="Select your primary role."
					>
						<Select id="role" bind:value={formData.role} options={roles} />
					</FormField>

					<FormField id="color" label="Theme Color" layout="horizontal" align="center">
						<InputColor id="color" bind:value={formData.themeColor} />
					</FormField>

					<FormField id="notifications" label="Notifications" layout="horizontal" align="center">
						<div
							class="flex items-center gap-2"
							style:min-height="var(--control-height-base, 2.5rem)"
						>
							<Switch id="notifications" bind:checked={formData.notifications} />
							<span class="text-sm text-secondary"
								>{formData.notifications ? 'Enabled' : 'Disabled'}</span
							>
						</div>
					</FormField>
				</Form>
			</div>
		</section>

		<!-- Section 3: Dense Grid (3 Columns) with Contact Info -->
		<section class="card">
			<header>
				<h2>Contact Details</h2>
				<p>A dense 3-column layout using Tel and URL inputs.</p>
			</header>
			<div class="card-body">
				<Form columns={3} gap="sm">
					<FormField id="phone" label="Phone (Tel)">
						<Input
							type="tel"
							id="phone"
							bind:value={formData.phone}
							placeholder="+1 (555) 000-0000"
							fullWidth
						/>
					</FormField>
					<FormField id="website" label="Website (URL)">
						<Input
							type="url"
							id="website"
							bind:value={formData.website}
							placeholder="https://"
							fullWidth
						/>
					</FormField>
					<FormField id="country" label="Country">
						<Select
							id="country"
							bind:value={formData.country}
							options={[
								{ label: 'United States', value: 'usa' },
								{ label: 'Canada', value: 'ca' },
								{ label: 'United Kingdom', value: 'uk' }
							]}
						/>
					</FormField>
				</Form>
			</div>
		</section>

		<!-- Section: Typography -->
		<section class="card">
			<header>
				<h2>Typography</h2>
				<p>Font selection and numeric sizing.</p>
			</header>
			<div class="card-body">
				<Form columns={2} gap="md">
					<FormField id="fontFamily" label="Font Family">
						<Select id="fontFamily" options={fonts} bind:value={formData.fontFamily} />
					</FormField>
					<FormField id="fontSize" label="Font Size (px)">
						<Input type="number" id="fontSize" bind:value={formData.fontSize} min={8} max={72} />
					</FormField>
				</Form>
				<div class="p-4 mt-4 border border-border-base rounded bg-surface-alt">
					<p
						style:font-family={formData.fontFamily}
						style:font-size="{formData.fontSize}px"
						class="transition-all"
					>
						The quick brown fox jumps over the lazy dog.
					</p>
				</div>
			</div>
		</section>

		<!-- Section: Date & Time -->
		<section class="card">
			<header>
				<h2>Date & Time</h2>
				<p>Comprehensive date and time inputs.</p>
			</header>
			<div class="card-body">
				<Form columns={2} gap="md">
					<FormField id="dob" label="Date of Birth (Date)">
						<Input type="date" id="dob" bind:value={formData.dob} fullWidth />
					</FormField>
					<FormField id="meetingTime" label="Meeting Time (Time)">
						<Input type="time" id="meetingTime" bind:value={formData.meetingTime} fullWidth />
					</FormField>
					<FormField id="month" label="Target Month (Month)">
						<Input type="month" id="month" bind:value={formData.month} fullWidth />
					</FormField>
					<FormField id="week" label="Target Week (Week)">
						<Input type="week" id="week" bind:value={formData.week} fullWidth />
					</FormField>
				</Form>
			</div>
		</section>

		<!-- Section 4: Actions -->
		<section class="card action-card">
			<div class="flex flex-col gap-4">
				<Checkbox
					id="terms"
					label="I agree to the Terms of Service and Privacy Policy"
					bind:checked={formData.agreeToTerms}
				/>
				<div class="actions">
					<Button variant="outline">Reset</Button>
					<Button variant="primary" disabled={!formData.agreeToTerms}>Save Changes</Button>
				</div>
			</div>
		</section>

		<!-- Live Preview -->
		<section class="preview">
			<h3>Form Data Preview</h3>
			<pre>{JSON.stringify(formData, null, 2)}</pre>
		</section>
	</div>
</div>

<style>
	.page-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
		font-family: var(--font-sans);
		color: var(--text-primary);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.card {
		background-color: var(--bg-surface);
		border: 1px solid var(--border-base);
		border-radius: var(--radius-lg, 0.5rem);
		overflow: hidden;
	}

	.card header {
		background-color: var(--bg-surface-alt);
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--border-base);
	}

	.card header h2 {
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.card header p {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.card-body {
		padding: 1.5rem;
	}

	.action-card {
		padding: 1.5rem;
	}

	.actions {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
	}

	.preview {
		background-color: var(--bg-surface-elevated);
		padding: 1.5rem;
		border-radius: var(--radius-lg, 0.5rem);
		border: 1px dashed var(--border-base);
	}

	.preview h3 {
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 1rem;
		color: var(--text-secondary);
	}

	pre {
		background-color: var(--bg-surface-alt);
		padding: 1rem;
		border-radius: 0.25rem;
		font-family: var(--font-mono);
		font-size: 0.875rem;
		overflow-x: auto;
	}

	/* Utility-like classes used in snippet */
	.flex {
		display: flex;
	}
	.flex-col {
		flex-direction: column;
	}
	.items-center {
		align-items: center;
	}
	.gap-2 {
		gap: 0.5rem;
	}
	.gap-4 {
		gap: 1rem;
	}
	.text-sm {
		font-size: 0.875rem;
	}
	.text-secondary {
		color: var(--text-secondary);
	}
	.p-4 {
		padding: 1rem;
	}
	.mt-4 {
		margin-top: 1rem;
	}
	.border {
		border: 1px solid;
	}
	.border-border-base {
		border-color: var(--border-base);
	}
	.rounded {
		border-radius: var(--radius-md, 0.375rem);
	}
	.bg-surface-alt {
		background-color: var(--bg-surface-alt);
	}
	.transition-all {
		transition: all 0.2s ease;
	}
</style>
