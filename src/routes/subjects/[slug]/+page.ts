import { error } from '@sveltejs/kit';
import { subjects } from '#lib/subjects/index.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => subjects.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const subject = subjects.find((s) => s.slug === params.slug);
	if (!subject) error(404, 'Subject not found');
	return { subject };
};
