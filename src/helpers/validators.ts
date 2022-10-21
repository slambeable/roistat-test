import type { InternalRuleItem } from 'async-validator';

type Callback = (error?: string | Error) => void;

export const validatorPhone = (__: InternalRuleItem, value: string, callback: Callback) => {
  if (!value) {
    callback(new Error('Пожалуйства введие телефон'));
    return;
  }

  setTimeout(() => {
    if (!Number.isInteger(Number(value))) {
      callback(new Error('Телефон может состоять только из цифр'));
    } else if (value.length !== 11) {
      callback(new Error('Телефон должен содержать 11 цифр'));
    } else {
      callback();
    }
  }, 1000);
};

export const validatorName = (__: InternalRuleItem, value: string, callback: Callback) => {
  if (!value) {
    callback(new Error('Пожалуйства введие имя'));
    return;
  }

  if (/[^а-яё]/i.test(value)) {
    callback(new Error('Имя может состоять только из кириллицы'));
    return;
  }

  callback();
};
