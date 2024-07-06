import axios from "axios";
import { useState } from "react";

const system_prompt = 'Ты — чат-бот, разработанный для помощи разработчикам, использующим документацию RuStore. Твоя задача — отвечать на вопросы пользователей и помогать им решать ошибки в программном коде, основываясь на документации RuStore. Отвечай на русском языке, предоставляй конкретную и четкую информацию, и избегай неопределенных и общих ответов.'

const getCurrentTime = () =>
  new Date(Date.now()).toLocaleTimeString("ru-RU", {
    hour: "numeric",
    minute: "numeric",
  });

export const useMessages = () => {
  const [messages, setMessage] = useState<IMessage[]>([
    {
      message: "Здраствуйте! Какой у вас вопрос?",
      time: getCurrentTime(),
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const askQuestion = async (prompt: string) => {
    try {
      setIsLoading(true);
      setMessage((prev) => [
        ...prev,
        {
          message: prompt,
          time: getCurrentTime(),
          isUser: true,
        },
      ]);
      const { data } = await axios.post<IResponseMessage>(
        "http://localhost:8001/v1/completions",
        {
          include_sources: true,
          prompt,
          stream: false,
          system_prompt,
          use_context: true,
        }
      );
      setMessage((prev) => [
        ...prev,
        {
          message: data,
          time: getCurrentTime(),
          isUser: false,
        },
      ]);
    } catch (err) {
      // @ts-ignore
      setError(err.data);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    askQuestion,
    isLoading,
    error,
  };
};

export interface IMessage {
  message: string | IResponseMessage;
  time: string;
  isUser: boolean;
}

interface IResponseMessage {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: [
    {
      finish_reason: string;
      delta: null;
      message: {
        role: string;
        content: string;
      };
      sources: {
        object: string;
        score: number;
        document: {
          object: string;
          doc_id: string;
          doc_metadata: {
            window: string;
            original_text: string;
            file_name: string;
            doc_id: string;
          };
        };
        text: string;
        previous_texts: null;
        next_texts: null;
      }[];
      index: number;
    }
  ];
}
// {
//   "id": "1f1e751d-addf-4572-b778-8c33942374d2",
//   "object": "completion",
//   "created": 1720217242,
//   "model": "private-gpt",
//   "choices": [
//       {
//           "finish_reason": "stop",
//           "delta": null,
//           "message": {
//               "role": "assistant",
//               "content": " To fix the error \"A previously created purchase of product “…” in the quantity of … for the amount of … rubles is being paid in another session\", you need to handle incomplete or failed purchases by canceling or consuming the \"stuck\" purchases at the start of the application or when opening the store.\n\nThis issue usually occurs when a purchase process was interrupted, and the deletion or consumption was not triggered in `purchaseProduct` due to an incorrect process termination.\n\nFor such cases, you need to implement the logic for canceling or consuming \"hung\" purchases. For example, you can put this logic in a separate button.\n\nHere's an example of how to handle purchase results:\n\n```java\nprivate void purchaseProduct(Product product) {\n    PurchasesUseCase purchasesUseCase = billingClient.getPurchases();\n    purchasesUseCase.purchaseProduct(product.getProductId())\n            .addOnSuccessListener(paymentResult -> handlePaymentResult(paymentResult, product))\n            .addOnFailureListener(throwable -> { /* Handle error */ });\n}\n\nprivate void handlePaymentResult(PaymentResult paymentResult, Product product) {\n    PurchasesUseCase purchasesUseCase = billingClient.getPurchases();\n    if (paymentResult instanceof PaymentResult.Cancelled) {\n        String purchaseId = ((PaymentResult.Cancelled) paymentResult).getPurchaseId();\n        purchasesUseCase.deletePurchase(purchaseId);\n    } else if (paymentResult instanceof PaymentResult.Success) {\n        PaymentResult.Success purchaseResult = ((PaymentResult.Success) paymentResult);\n        purchasesUseCase.confirmPurchase(purchaseResult.getPurchaseId());\n    } else if (paymentResult instanceof PaymentResult.Failure) {\n        String purchaseId = ((PaymentResult.Failure) paymentResult).getPurchaseId();\n        if (purchaseId != null) {\n            purchasesUseCase.deletePurchase(purchaseId);\n        }\n    }\n}\n```\n\nFor more details on handling purchase statuses, refer to the documentation.\n\nFor more details on getting a list of purchases, refer to the documentation.\n\nPurchase a product\n\nTo process the purchase result, do the following:\n\n```java\nprivate void"
//           },
//           "sources": [
//               {
//                   "object": "context.chunk",
//                   "score": 0.7410879896329441,
//                   "document": {
//                       "object": "ingest.document",
//                       "doc_id": "f0e98e46-ee93-4dfe-a405-f959ab2b1531",
//                       "doc_metadata": {
//                           "window": "Убедитесь, что используемый buildType (например, debug) использует такую же подпись, что и опубликованное приложение (например, release).\n\n\n\n Для работы платежей нужно полностью опубликовать приложение, модерации недостаточно.  В скором времени логика будет переработана так, чтобы для тестирования платежей достаточно было прохождения модерации.\n\n\n\n Q: Как исправить ошибку «Созданная ранее покупка продукта “…” в количестве … на сумму … рублей оплачивается в другой сессии».\n\n A: Ошибка возникает при попытке купить продукт, покупка которого была прекращена и не переведена в конечное состояние с помощью методов deletePurchase и confirmPurchase.\n\n Зачастую это происходит, когда процесс был прерван, а удаление или потребление не было вызвано в purchaseProduct из-за некорректного завершения процесса.\n\n Для таких случаев необходимо произвести отмену или потребление «подвисших» покупок при старте приложения или открытии магазина.\n\n",
//                           "original_text": "Q: Как исправить ошибку «Созданная ранее покупка продукта “…” в количестве … на сумму … рублей оплачивается в другой сессии».\n\n",
//                           "file_name": "documentation.docx",
//                           "doc_id": "f0e98e46-ee93-4dfe-a405-f959ab2b1531"
//                       }
//                   },
//                   "text": "Убедитесь, что используемый buildType (например, debug) использует такую же подпись, что и опубликованное приложение (например, release).\n\n\n\n Для работы платежей нужно полностью опубликовать приложение, модерации недостаточно.  В скором времени логика будет переработана так, чтобы для тестирования платежей достаточно было прохождения модерации.\n\n\n\n Q: Как исправить ошибку «Созданная ранее покупка продукта “…” в количестве … на сумму … рублей оплачивается в другой сессии».\n\n A: Ошибка возникает при попытке купить продукт, покупка которого была прекращена и не переведена в конечное состояние с помощью методов deletePurchase и confirmPurchase.\n\n Зачастую это происходит, когда процесс был прерван, а удаление или потребление не было вызвано в purchaseProduct из-за некорректного завершения процесса.\n\n Для таких случаев необходимо произвести отмену или потребление «подвисших» покупок при старте приложения или открытии магазина.\n\n",
//                   "previous_texts": null,
//                   "next_texts": null
//               },
//               {
//                   "object": "context.chunk",
//                   "score": 0.7289447224320189,
//                   "document": {
//                       "object": "ingest.document",
//                       "doc_id": "f0e98e46-ee93-4dfe-a405-f959ab2b1531",
//                       "doc_metadata": {
//                           "window": "Например, вынести эту логику в отдельную кнопку.\n\n\n\n Чтобы узнать подробности об обработке статусов покупок, ознакомьтесь с информацией.\n\n Чтобы узнать подробности получения списка покупок, ознакомьтесь с информацией.\n\n Покупка продукта\n\nОбработать результат покупки необходимо следующим образом:\n\nprivate void purchaseProduct(Product product) {    ``PurchasesUseCase purchasesUseCase = billingClient.getPurchases();    ``purchasesUseCase.purchaseProduct(product.getProductId())            ``.addOnSuccessListener(paymentResult -> handlePaymentResult(paymentResult, product))            ``.addOnFailureListener(throwable -> {  /* Handle error */ });    ``}private void handlePaymentResult(PaymentResult paymentResult, Product product) {    ``PurchasesUseCase purchasesUseCase = billingClient.getPurchases();    ``if (paymentResult  instanceof PaymentResult.Cancelled) {        ``String purchaseId = ((PaymentResult.Cancelled) paymentResult).getPurchaseId();        ``purchasesUseCase.deletePurchase(purchaseId);    ``}  else if (paymentResult  instanceof PaymentResult.Success) {        ``PaymentResult.Success purchaseResult = ((PaymentResult.Success) paymentResult);        ``purchasesUseCase.confirmPurchase(purchaseResult.getPurchaseId());    ``}  else if (paymentResult  instanceof PaymentResult.Failure) {        ``String purchaseId = ((PaymentResult.Failure) paymentResult).getPurchaseId();        ``if (purchaseId !=  null ) {            ``purchasesUseCase.deletePurchase(purchaseId);        ``}    ``}}\n\nЧтобы узнать подробности о покупке продукта, ознакомьтесь с информацией.\n\n Чтобы узнать подробности о обработке статусов покупок, ознакомьтесь с информацией.\n\n Общая информация\n\nВы можете ознакомиться с разделом для быстрой интеграции платежей в приложение.\n\n Пример реализации\n\nОзнакомьтесь с приложением-примером чтобы узнать, как правильно интегрировать платежи.\n\n\n\n",
//                           "original_text": "Покупка продукта\n\nОбработать результат покупки необходимо следующим образом:\n\nprivate void purchaseProduct(Product product) {    ``PurchasesUseCase purchasesUseCase = billingClient.getPurchases();    ``purchasesUseCase.purchaseProduct(product.getProductId())            ``.addOnSuccessListener(paymentResult -> handlePaymentResult(paymentResult, product))            ``.addOnFailureListener(throwable -> {  /* Handle error */ });    ``}private void handlePaymentResult(PaymentResult paymentResult, Product product) {    ``PurchasesUseCase purchasesUseCase = billingClient.getPurchases();    ``if (paymentResult  instanceof PaymentResult.Cancelled) {        ``String purchaseId = ((PaymentResult.Cancelled) paymentResult).getPurchaseId();        ``purchasesUseCase.deletePurchase(purchaseId);    ``}  else if (paymentResult  instanceof PaymentResult.Success) {        ``PaymentResult.Success purchaseResult = ((PaymentResult.Success) paymentResult);        ``purchasesUseCase.confirmPurchase(purchaseResult.getPurchaseId());    ``}  else if (paymentResult  instanceof PaymentResult.Failure) {        ``String purchaseId = ((PaymentResult.Failure) paymentResult).getPurchaseId();        ``if (purchaseId !=  null ) {            ``purchasesUseCase.deletePurchase(purchaseId);        ``}    ``}}\n\nЧтобы узнать подробности о покупке продукта, ознакомьтесь с информацией.\n\n",
//                           "file_name": "documentation.docx",
//                           "doc_id": "f0e98e46-ee93-4dfe-a405-f959ab2b1531"
//                       }
//                   },
//                   "text": "Например, вынести эту логику в отдельную кнопку.\n\n\n\n Чтобы узнать подробности об обработке статусов покупок, ознакомьтесь с информацией.\n\n Чтобы узнать подробности получения списка покупок, ознакомьтесь с информацией.\n\n Покупка продукта\n\nОбработать результат покупки необходимо следующим образом:\n\nprivate void purchaseProduct(Product product) {    ``PurchasesUseCase purchasesUseCase = billingClient.getPurchases();    ``purchasesUseCase.purchaseProduct(product.getProductId())            ``.addOnSuccessListener(paymentResult -> handlePaymentResult(paymentResult, product))            ``.addOnFailureListener(throwable -> {  /* Handle error */ });    ``}private void handlePaymentResult(PaymentResult paymentResult, Product product) {    ``PurchasesUseCase purchasesUseCase = billingClient.getPurchases();    ``if (paymentResult  instanceof PaymentResult.Cancelled) {        ``String purchaseId = ((PaymentResult.Cancelled) paymentResult).getPurchaseId();        ``purchasesUseCase.deletePurchase(purchaseId);    ``}  else if (paymentResult  instanceof PaymentResult.Success) {        ``PaymentResult.Success purchaseResult = ((PaymentResult.Success) paymentResult);        ``purchasesUseCase.confirmPurchase(purchaseResult.getPurchaseId());    ``}  else if (paymentResult  instanceof PaymentResult.Failure) {        ``String purchaseId = ((PaymentResult.Failure) paymentResult).getPurchaseId();        ``if (purchaseId !=  null ) {            ``purchasesUseCase.deletePurchase(purchaseId);        ``}    ``}}\n\nЧтобы узнать подробности о покупке продукта, ознакомьтесь с информацией.\n\n Чтобы узнать подробности о обработке статусов покупок, ознакомьтесь с информацией.\n\n Общая информация\n\nВы можете ознакомиться с разделом для быстрой интеграции платежей в приложение.\n\n Пример реализации\n\nОзнакомьтесь с приложением-примером чтобы узнать, как правильно интегрировать платежи.\n\n\n\n",
//                   "previous_texts": null,
//                   "next_texts": null
//               }
//           ],
//           "index": 0
//       }
//   ]
// }
