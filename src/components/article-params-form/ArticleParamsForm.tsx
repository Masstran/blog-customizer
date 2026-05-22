import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLElement>(null);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const [fontFamilyOption, setFontFamilyOption] = useState(
		props.articleState.fontFamilyOption
	);

	const [fontSizeOption, setFontSizeOption] = useState(
		props.articleState.fontSizeOption
	);

	const [fontColor, setFontColor] = useState(props.articleState.fontColor);

	const [backgroundColor, setBackgroundColor] = useState(
		props.articleState.backgroundColor
	);

	const [contentWidth, setContentWidth] = useState(
		props.articleState.contentWidth
	);

	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as Node;
			if (asideRef.current && !asideRef.current.contains(target)) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		props.setArticleState(defaultArticleState);
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontSizeOption(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setIsSidebarOpen(false);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		props.setArticleState({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		});
		setIsSidebarOpen(false);
	};

	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => {
					setIsSidebarOpen((prev) => !prev);
				}}
			/>
			<aside
				className={clsx(
					styles.container,
					isSidebarOpen && styles.container_open
				)}
				ref={asideRef}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text size={31} weight={800} family={'open-sans'} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={(selected) => {
							setFontFamilyOption(selected);
						}}
					/>
					<RadioGroup
						name={'fontSize'}
						selected={fontSizeOption}
						options={fontSizeOptions}
						title={'Размер шрифта'}
						onChange={(value) => {
							setFontSizeOption(value);
						}}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={(selected) => {
							setFontColor(selected);
						}}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={(selected) => {
							setBackgroundColor(selected);
						}}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={(selected) => {
							setContentWidth(selected);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
